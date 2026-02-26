"use client";
import ThreeColLayout from "@/components/mlayouts/threeColLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useEffect, useState } from "react";

export default function NewRequestPage() {
  const [role, setRole] = useState<"requester" | "admin">("requester");

  useEffect(() => {
    function getRole() {
      setRole("admin");
    }

    getRole();
  }, []);

  const classifications = [
    "Amulet (AMU)",
    "Antiquity (ATQ)",
    "Art (ART)",
    "Art-Stained-Glass (ART)",
    "Audiovisual (AV)",
    "Bible-Printed Book (BIB)",
    "Binders Fragment (BF)",
    "Bullae (BUL)",
    "Ceramics (CER)",
    "Coin (NUM)",
    "Cuneiform (CUN)",
    "Facsimile (FAC)",
    "Furniture (FUR)",
    "Incunable (INC)",
    "Jewelry (JWL)",
    "Jewish Paraphernalia (JUD)",
    "Manuscript (MS)",
    "Manuscript-Papyrus (MS/PAP)",
    "Metals (MTL)",
    "Mummy Paraphernalia (MMY)",
    "Object (OBJ)",
    "Ostraca (OSTR)",
    "Pamphlet (PAM)",
    "Papers (PPR)",
    "Papyrus (PAP)",
    "Photograph (PHO)",
    "Press (PRS)",
    "Printed Book (PBK)",
    "Scroll (SCR)",
    "Seal (SEA)",
    "Statuary (STA)",
    "Stone (STN)",
    "Textile (TXT)",
    "Torah Paraphernalia (ARK)",
  ].sort((a, b) => a.localeCompare(b));

  interface RequestFormValues {
    firstName: string;
    lastName: string;
    email: string;
    classification: string; // always controlled, empty string when none
    objectName: string;
    objectCode: string;
    tier: string;
    onDisplay: boolean;
    objectLocation: string;
    width: string;
    height: string;
    depth: string;
    requestDueDate?: Date;
    requestType: string;
    additionalNotes: string;
  }

  const formik = useFormik<RequestFormValues>({
    initialValues: {
      firstName: "firstName",
      lastName: "lastName",
      email: "email@gmail.com",
      classification: "",
      objectName: "",
      objectCode: "",
      tier: "",
      onDisplay: false,
      objectLocation: "",
      width: "",
      height: "",
      depth: "",
      requestDueDate: undefined,
      requestType: "",
      additionalNotes: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // TODO: push values to database
      formik.resetForm();
    },
  });

  return (
    <ThreeColLayout navRole={role}>
      <Card className="col-span-4 mb-20 overflow-y-auto md:col-span-6 lg:col-span-10 lg:mb-0">
        <CardHeader className="text-center">
          <CardTitle>New Request</CardTitle>
          <CardDescription>
            Fill out the form below to submit a new digitisation request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-8 lg:w-2/3"
            >
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="input-wrapper w-full">
                  <Label htmlFor="firstName" className="mb-2">
                    First Name{" "}
                    <span className="text-museum-dark-orange text-xs">
                      (required)
                    </span>
                  </Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                </div>
                <div className="input-wrapper w-full">
                  <Label htmlFor="lastName" className="mb-2">
                    Last Name{" "}
                    <span className="text-museum-dark-orange text-xs">
                      (required)
                    </span>
                  </Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <Label htmlFor="email" className="mb-2">
                  Email{" "}
                  <span className="text-museum-dark-orange text-xs">
                    (required)
                  </span>
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>

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
                      <SelectItem value="tier-4" className="cursor-pointer">
                        Tier 4
                      </SelectItem>
                      <SelectItem value="tier-3" className="cursor-pointer">
                        Tier 3
                      </SelectItem>
                      <SelectItem value="tier-2" className="cursor-pointer">
                        Tier 2
                      </SelectItem>
                      <SelectItem value="tier-1" className="cursor-pointer">
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
                        defaultMonth={formik.values.requestDueDate || undefined}
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

              <Button
                type="submit"
                className="bg-museum-orange hover:bg-museum-dark-orange cursor-pointer"
              >
                Submit Request
              </Button>
            </form>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <small className="text-center">
            Your submission was successful. An administrator will reach out to
            you soon to answer your query.
          </small>
        </CardFooter>
      </Card>
    </ThreeColLayout>
  );
}
