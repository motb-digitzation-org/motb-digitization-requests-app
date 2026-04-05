"use client";
import { getAllRequestsByUser } from "@/app/database/actions/requestActions/getRequests";
import { updateRequestAsRequester } from "@/app/database/actions/requestActions/updateRequest";
import { classifications, RequestFormValues } from "@/app/database/utils";
import ThreeColLayout from "@/components/mlayouts/threeColLayout";
import RequestPreview from "@/components/mwidgets/requestPreview";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RequestsPage() {
  const [user, setUser] = useState<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: "requester" | "fulfiller";
    createdAt: string;
    updatedAt: string;
  } | null>(null);
  const [role, setRole] = useState<"requester" | "fulfiller">("requester");
  const router = useRouter();
  const [alert, setAlert] = useState<string>("");
  const [requestsList, setRequestsList] = useState<
    | {
        id: number;
        objectClass: string;
        objectName: string;
        objectCode: string;
        objectTier: number | null;
        objectOnDisplay: boolean;
        objectLocation: string | null;
        objectWidth: string | null;
        objectHeight: string | null;
        objectDepth: string | null;
        objectMule: string | null;
        objectPulledDate: Date | null;
        objectPutBackDate: Date | null;
        requestDueDate: Date | null;
        requestType: string;
        requestNotes: string | null;
        requestStartDate: Date | null;
        requestEndDate: Date | null;
        requestExportDate: Date | null;
        requestTotalImgSize: string | null;
        requestStatus: string;
        adminNotes: string | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | undefined
  >(undefined);

  const [requestIndex, setRequestIndex] = useState<number | null>(null);

  useEffect(() => {
    function getUser() {
      const userData = window.sessionStorage.getItem("user");

      if (userData) {
        const userParsed = JSON.parse(userData);
        setUser(userParsed);
        setRole(userParsed.role as "requester" | "fulfiller");
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getAllRequests(userId: number) {
      const response = await getAllRequestsByUser(userId);

      if (response.success) {
        setRequestsList(response.requestsList);
      }
    }

    if (user) {
      getAllRequests(user.id);
    }
  }, [user]);

  const formik = useFormik<RequestFormValues>({
    enableReinitialize: true,
    initialValues: {
      firstName: user ? user.firstName : "firstName",
      lastName: user ? user.lastName : "lastName",
      email: user ? user.email : "email@gmail.com",
      classification:
        requestsList !== undefined && requestIndex !== null
          ? `${requestsList[requestIndex].objectClass}`
          : "Paper (PPR)",
      objectName:
        requestsList !== undefined && requestIndex != null
          ? requestsList[requestIndex].objectName
          : "",
      objectCode:
        requestsList !== undefined && requestIndex != null
          ? requestsList[requestIndex].objectCode
          : "",
      tier: "1",
      onDisplay:
        requestsList !== undefined && requestIndex !== null
          ? requestsList[requestIndex].objectOnDisplay
          : false,
      objectLocation:
        requestsList !== undefined &&
        requestIndex != null &&
        requestsList[requestIndex].objectLocation != null
          ? requestsList[requestIndex].objectLocation
          : "",
      width:
        requestsList !== undefined &&
        requestIndex != null &&
        requestsList[requestIndex].objectWidth != null
          ? requestsList[requestIndex].objectWidth
          : "",
      height:
        requestsList !== undefined &&
        requestIndex != null &&
        requestsList[requestIndex].objectHeight != null
          ? requestsList[requestIndex].objectHeight
          : "",
      depth:
        requestsList !== undefined &&
        requestIndex != null &&
        requestsList[requestIndex].objectDepth != null
          ? requestsList[requestIndex].objectDepth
          : "",
      requestDueDate:
        requestsList !== undefined &&
        requestIndex != null &&
        requestsList[requestIndex].requestDueDate != null
          ? requestsList[requestIndex].requestDueDate
          : undefined,
      requestType:
        requestsList !== undefined &&
        requestIndex != null &&
        requestsList[requestIndex].requestType != null
          ? requestsList[requestIndex].requestType
          : "",
      additionalNotes:
        requestsList !== undefined &&
        requestIndex != null &&
        requestsList[requestIndex].requestNotes != null
          ? requestsList[requestIndex].requestNotes
          : "",
      objectPulledDate: undefined,
      objectPutBackDate: undefined,
      requestStartDate: undefined,
      requestEndDate: undefined,
      totalImageSize: "",
    },
    onSubmit: async (values) => {
      if (user && requestsList && requestIndex && user.role == "requester") {
        const response = await updateRequestAsRequester(
          requestsList[requestIndex].id,
          values.classification,
          values.objectName,
          values.objectCode,
          Number(values.tier),
          values.onDisplay,
          values.objectLocation,
          values.width,
          values.height,
          values.depth,
          values.requestDueDate ? new Date(values.requestDueDate) : undefined,
          values.requestType,
          values.additionalNotes,
          user.id,
        );

        if (response.success) {
          setAlert("Your request has been updated.");
        } else {
          setAlert("Could not update request. Please try again.");
        }
      }
    },
  });

  if (user) {
    return (
      <ThreeColLayout navRole={role}>
        <Card className="col-span-4 mb-20 overflow-y-auto md:col-span-6 lg:col-span-4 lg:mb-0">
          <CardHeader>
            <CardTitle>All Requests</CardTitle>
            <CardDescription className="mb-2">
              Below is a list of all your requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {requestsList !== undefined &&
                requestsList.map((request, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setRequestIndex(index);
                      setAlert("");
                    }}
                  >
                    <RequestPreview
                      index={index}
                      selectedRequest={requestIndex}
                      objectCode={request.objectCode}
                      requestType={request.requestType}
                      requestStatus={request.requestStatus}
                    />
                  </div>
                ))}

              {requestsList !== undefined ? (
                <p className="my-2 text-center text-xs text-gray-500">
                  End of requests.
                </p>
              ) : (
                <p className="my-2 text-center text-xs text-gray-500">
                  You have no requests.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="hidden overflow-y-auto lg:col-span-6 lg:block">
          <CardHeader className="mb-6">
            <CardTitle>Request Information</CardTitle>
            <CardDescription className="mb-2">
              Below is the information about your request.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {requestsList !== undefined && requestIndex !== null ? (
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-8"
              >
                <div className="input-wrapper">
                  <Label htmlFor="classification" className="mb-2">
                    Object Classification{" "}
                    <span className="text-museum-dark-orange text-xs">
                      (required)
                    </span>
                  </Label>
                  <Combobox
                    items={classifications}
                    autoHighlight
                    id="classification"
                    value={formik.values.classification}
                    onValueChange={(value) => {
                      formik.setFieldValue("classification", value);
                      formik.setFieldTouched("classification", true);
                    }}
                    required
                  >
                    <ComboboxInput
                      placeholder="Select a classification"
                      showClear
                    />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>

                <div className="input-wrapper">
                  <Label htmlFor="objectName" className="mb-2">
                    Object Name{" "}
                    <span className="text-museum-dark-orange text-xs">
                      (required)
                    </span>
                  </Label>
                  <Input
                    type="text"
                    name="objectName"
                    id="objectName"
                    placeholder="Ex: Aitken Bible"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.objectName}
                  />
                </div>

                <div className="flex flex-col gap-8 md:flex-row">
                  <div className="input-wrapper w-full">
                    <Label htmlFor="objectCode" className="mb-2">
                      Object Code{" "}
                      <span className="text-museum-dark-orange text-xs">
                        (required)
                      </span>
                    </Label>
                    <Input
                      type="text"
                      name="objectCode"
                      id="objectCode"
                      placeholder="Ex: MOTB.BIB.004494"
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.objectCode}
                    />
                  </div>
                  <div className="input-wrapper w-full">
                    <Label htmlFor="tier" className="mb-2">
                      Tier
                    </Label>
                    <Select
                      value={formik.values.tier}
                      onValueChange={(value) => {
                        formik.setFieldValue("tier", value);
                        formik.setFieldTouched("tier", true); // optional
                      }}
                    >
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4" className="cursor-pointer">
                          Tier 4
                        </SelectItem>
                        <SelectItem value="3" className="cursor-pointer">
                          Tier 3
                        </SelectItem>
                        <SelectItem value="2" className="cursor-pointer">
                          Tier 2
                        </SelectItem>
                        <SelectItem value="1" className="cursor-pointer">
                          Tier 1
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="input-wrapper w-2/3">
                    <Label htmlFor="onDisplay" className="mb-2">
                      On Display?
                    </Label>
                    <div className="inline-flex items-center gap-2">
                      <Switch
                        id="onDisplay"
                        className="cursor-pointer"
                        checked={formik.values.onDisplay}
                        onCheckedChange={(value) => {
                          formik.setFieldValue("onDisplay", value);
                          formik.setFieldTouched("onDisplay", true);
                        }}
                      />
                      {formik.values.onDisplay ? <p>Yes</p> : <p>No</p>}
                    </div>
                  </div>
                </div>

                <div className="input-wrapper">
                  <Label htmlFor="objectLocation" className="mb-2">
                    Object Location
                  </Label>
                  <Input
                    type="text"
                    name="objectLocation"
                    id="objectLocation"
                    placeholder="Ex: Cabinet 9, Shelf 7"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.objectLocation}
                  />
                </div>

                <div className="input-wrapper">
                  <Label htmlFor="" className="mb-2">
                    Dimensions
                  </Label>
                  <div className="flex flex-row items-center justify-between">
                    <Input
                      type="text"
                      name="width"
                      id="width"
                      placeholder="Width (W)"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.width}
                    />
                    <hr className="w-8 border-black" />
                    <Input
                      type="text"
                      name="height"
                      id="height"
                      placeholder="Height (H)"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.height}
                    />
                    <hr className="w-8 border-black" />
                    <Input
                      type="text"
                      name="depth"
                      id="depth"
                      placeholder="Depth (D)"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.depth}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-8 md:flex-row">
                  <div className="input-wrapper w-full">
                    <Label htmlFor="requestDueDate" className="mb-2">
                      Request Due Date
                    </Label>
                    <Popover>
                      <PopoverTrigger
                        asChild
                        className="w-full"
                        id="requestDueDate"
                      >
                        <Button
                          variant="outline"
                          id="date-picker-simple"
                          className="cursor-pointer justify-start font-normal"
                        >
                          {formik.values.requestDueDate ? (
                            format(formik.values.requestDueDate, "P")
                          ) : (
                            <span className="text-gray-500">Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formik.values.requestDueDate}
                          onSelect={(date) => {
                            formik.setFieldValue("requestDueDate", date);
                            formik.setFieldTouched("requestDueDate", true);
                          }}
                          defaultMonth={
                            formik.values.requestDueDate || undefined
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="input-wrapper w-full">
                    <Label htmlFor="requestType" className="mb-2">
                      Request Type{" "}
                      <span className="text-museum-dark-orange text-xs">
                        (required)
                      </span>
                    </Label>
                    <Select
                      onValueChange={(value) => {
                        formik.setFieldValue("requestType", value);
                        formik.setFieldTouched("requestType", true);
                      }}
                      value={formik.values.requestType}
                      required
                    >
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Request Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bc100" className="cursor-pointer">
                          BC100
                        </SelectItem>
                        <SelectItem value="tsr" className="cursor-pointer">
                          Torah Scroll Rig (TSR)
                        </SelectItem>
                        <SelectItem value="msi" className="cursor-pointer">
                          Multi-Spectral Imaging (MSI)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="input-wrapper">
                  <Label htmlFor="additionalNotes" className="mb-2">
                    Additional Notes
                  </Label>
                  <Textarea
                    name="additionalNotes"
                    id="additionalNotes"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.additionalNotes}
                  />
                </div>
                {/* TODO: Check this */}
                {user.role == "fulfiller" && (
                  <div className="admin-inputs flex flex-col gap-8">
                    <h2>Inputs for the Admin</h2>

                    <div className="input-wrapper">
                      <Label htmlFor="" className="mb-2">
                        Object Pulled Date
                      </Label>
                      <Popover>
                        <PopoverTrigger
                          asChild
                          className="w-full"
                          id="objectPulledDate"
                        >
                          <Button
                            variant="outline"
                            id="date-picker-simple"
                            className="cursor-pointer justify-start font-normal"
                          >
                            {formik.values.objectPulledDate ? (
                              format(formik.values.objectPulledDate, "P")
                            ) : (
                              <span className="text-gray-500">Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formik.values.objectPulledDate}
                            onSelect={(date) => {
                              formik.setFieldValue("objectPulledDate", date);
                              formik.setFieldTouched("objectPulledDate", true);
                            }}
                            defaultMonth={
                              formik.values.objectPulledDate || undefined
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="input-wrapper">
                      <Label htmlFor="" className="mb-2">
                        Object Put Back Date
                      </Label>
                      <Popover>
                        <PopoverTrigger
                          asChild
                          className="w-full"
                          id="objectPutBackDate"
                        >
                          <Button
                            variant="outline"
                            id="date-picker-simple"
                            className="cursor-pointer justify-start font-normal"
                          >
                            {formik.values.objectPutBackDate ? (
                              format(formik.values.objectPutBackDate, "P")
                            ) : (
                              <span className="text-gray-500">Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formik.values.objectPutBackDate}
                            onSelect={(date) => {
                              formik.setFieldValue("objectPutBackDate", date);
                              formik.setFieldTouched("objectPutBackDate", true);
                            }}
                            defaultMonth={
                              formik.values.objectPutBackDate || undefined
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="input-wrapper">
                      <Label htmlFor="" className="mb-2">
                        Request Start Date
                      </Label>
                      <Popover>
                        <PopoverTrigger
                          asChild
                          className="w-full"
                          id="requestStartDate"
                        >
                          <Button
                            variant="outline"
                            id="date-picker-simple"
                            className="cursor-pointer justify-start font-normal"
                          >
                            {formik.values.requestStartDate ? (
                              format(formik.values.requestStartDate, "P")
                            ) : (
                              <span className="text-gray-500">Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formik.values.requestStartDate}
                            onSelect={(date) => {
                              formik.setFieldValue("requestStartDate", date);
                              formik.setFieldTouched("requestStartDate", true);
                            }}
                            defaultMonth={
                              formik.values.requestStartDate || undefined
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="input-wrapper">
                      <Label htmlFor="" className="mb-2">
                        Request End Date
                      </Label>
                      <Popover>
                        <PopoverTrigger
                          asChild
                          className="w-full"
                          id="requestEndDate"
                        >
                          <Button
                            variant="outline"
                            id="date-picker-simple"
                            className="cursor-pointer justify-start font-normal"
                          >
                            {formik.values.requestEndDate ? (
                              format(formik.values.requestEndDate, "P")
                            ) : (
                              <span className="text-gray-500">Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formik.values.requestEndDate}
                            onSelect={(date) => {
                              formik.setFieldValue("requestEndDate", date);
                              formik.setFieldTouched("requestEndDate", true);
                            }}
                            defaultMonth={
                              formik.values.requestEndDate || undefined
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="input-wrapper">
                      <Label htmlFor="" className="mb-2">
                        Total Image Size
                      </Label>
                      <Input
                        type="text"
                        name="totalImageSize"
                        id="totalImageSize"
                        placeholder="Total Image Size"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.totalImageSize}
                      />
                    </div>

                    <div className="input-wrapper">
                      <Label htmlFor="adminNotes" className="mb-2">
                        Request Notes
                      </Label>
                      <Textarea
                        name="adminNotes"
                        id="adminNotes"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // value={formik.values.additionalNotes}
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="bg-museum-teal cursor-pointer hover:bg-teal-800"
                >
                  Update Request
                </Button>
                <p className="text-center">{alert}</p>
              </form>
            ) : (
              <p>Please select a request to display it's data.</p>
            )}
          </CardContent>
        </Card>
      </ThreeColLayout>
    );
  } else {
    return (
      // TODO: make this look nicer
      <div className="p-4">
        <h1>You&apos;re not logged in!</h1>
        <p>Return home to login or signup.</p>
        <button
          type="button"
          onClick={() => {
            router.push("/");
          }}
        >
          Login
        </button>
      </div>
    );
  }
}
