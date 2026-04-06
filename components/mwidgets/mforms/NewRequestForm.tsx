"use client";
import { createRequestAsRequester } from "@/app/database/actions/requestActions/createRequest";
import {
  classifications,
  RequestFormValues,
  requestStatus,
  UserInterface,
} from "@/app/database/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CardFooter } from "@/components/ui/card";
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
import { useState } from "react";

interface NewRequestFormProps {
  user: UserInterface;
}

export default function NewRequestForm({ user }: NewRequestFormProps) {
  const [alert, setAlert] = useState<string>("");

  const formikRequester = useFormik<RequestFormValues>({
    enableReinitialize: true,
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      classification: { value: "", label: "" },
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
    onSubmit: async (values) => {
      const response = await createRequestAsRequester(
        values.classification.value,
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
        setAlert("Your submission was successful.");
        formikRequester.resetForm();
      } else {
        setAlert("Your submission was not successful. Please try again.");
      }

      // clear alert after 5 secs
      setTimeout(() => {
        setAlert("");
      }, 5000);
    },
  });

  const formikFulfiller = useFormik<RequestFormValues>({
    enableReinitialize: true,
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      classification: { value: "", label: "" },
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
      // admin fields
      mule: "",
      pulledDate: undefined,
      putBackDate: undefined,
      requestStartDate: undefined,
      requestEndDate: undefined,
      requestExportDate: undefined,
      totalImageSize: "",
      requestStatus: "",
      adminNotes: "",
    },
    onSubmit: async (values) => {
      console.log("values", values);
    },
  });

  if (user.role == "requester") {
    return (
      <form
        onSubmit={formikRequester.handleSubmit}
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
              onChange={formikRequester.handleChange}
              onBlur={formikRequester.handleBlur}
              value={formikRequester.values.firstName}
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
              onChange={formikRequester.handleChange}
              onBlur={formikRequester.handleBlur}
              value={formikRequester.values.lastName}
            />
          </div>
        </div>

        <div className="input-wrapper">
          <Label htmlFor="email" className="mb-2">
            Email{" "}
            <span className="text-museum-dark-orange text-xs">(required)</span>
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            onChange={formikRequester.handleChange}
            onBlur={formikRequester.handleBlur}
            value={formikRequester.values.email}
          />
        </div>

        <div className="input-wrapper">
          <Label htmlFor="classification" className="mb-2">
            Object Classification{" "}
            <span className="text-museum-dark-orange text-xs">(required)</span>
          </Label>
          <Combobox
            items={classifications}
            autoHighlight
            id="classification"
            value={formikRequester.values.classification}
            onValueChange={(value) => {
              formikRequester.setFieldValue("classification", value);
              formikRequester.setFieldTouched("classification", true);
            }}
            required
          >
            <ComboboxInput placeholder="Select a classification" showClear />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <div className="input-wrapper">
          <Label htmlFor="objectName" className="mb-2">
            Object Name{" "}
            <span className="text-museum-dark-orange text-xs">(required)</span>
          </Label>
          <Input
            type="text"
            name="objectName"
            id="objectName"
            placeholder="Ex: Aitken Bible"
            required
            onChange={formikRequester.handleChange}
            onBlur={formikRequester.handleBlur}
            value={formikRequester.values.objectName}
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
              onChange={formikRequester.handleChange}
              onBlur={formikRequester.handleBlur}
              value={formikRequester.values.objectCode}
            />
          </div>
          <div className="input-wrapper w-full">
            <Label htmlFor="tier" className="mb-2">
              Tier
            </Label>
            <Select
              value={formikRequester.values.tier}
              onValueChange={(value) => {
                formikRequester.setFieldValue("tier", value);
                formikRequester.setFieldTouched("tier", true); // optional
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
                checked={formikRequester.values.onDisplay}
                onCheckedChange={(value) => {
                  formikRequester.setFieldValue("onDisplay", value);
                  formikRequester.setFieldTouched("onDisplay", true);
                }}
              />
              {formikRequester.values.onDisplay ? <p>Yes</p> : <p>No</p>}
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
            onChange={formikRequester.handleChange}
            onBlur={formikRequester.handleBlur}
            value={formikRequester.values.objectLocation}
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
              onChange={formikRequester.handleChange}
              onBlur={formikRequester.handleBlur}
              value={formikRequester.values.width}
            />
            <hr className="w-8 border-black" />
            <Input
              type="text"
              name="height"
              id="height"
              placeholder="Height (H)"
              onChange={formikRequester.handleChange}
              onBlur={formikRequester.handleBlur}
              value={formikRequester.values.height}
            />
            <hr className="w-8 border-black" />
            <Input
              type="text"
              name="depth"
              id="depth"
              placeholder="Depth (D)"
              onChange={formikRequester.handleChange}
              onBlur={formikRequester.handleBlur}
              value={formikRequester.values.depth}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="input-wrapper w-full">
            <Label htmlFor="requestDueDate" className="mb-2">
              Request Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild className="w-full" id="requestDueDate">
                <Button
                  variant="outline"
                  // id="date-picker-simple"
                  className="date-picker-simple cursor-pointer justify-start font-normal"
                >
                  {formikRequester.values.requestDueDate ? (
                    format(formikRequester.values.requestDueDate, "P")
                  ) : (
                    <span className="text-gray-500">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formikRequester.values.requestDueDate}
                  onSelect={(date) => {
                    formikRequester.setFieldValue("requestDueDate", date);
                    formikRequester.setFieldTouched("requestDueDate", true);
                  }}
                  defaultMonth={
                    formikRequester.values.requestDueDate || undefined
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
                formikRequester.setFieldValue("requestType", value);
                formikRequester.setFieldTouched("requestType", true);
              }}
              value={formikRequester.values.requestType}
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
            onChange={formikRequester.handleChange}
            onBlur={formikRequester.handleBlur}
            value={formikRequester.values.additionalNotes}
          />
        </div>

        <Button
          type="submit"
          className="bg-museum-orange hover:bg-museum-dark-orange cursor-pointer"
        >
          Submit Request
        </Button>

        <CardFooter className="justify-center">
          <small className="text-center">{alert}</small>
        </CardFooter>
      </form>
    );
  } else {
    return (
      <form
        onSubmit={formikFulfiller.handleSubmit}
        className="flex flex-col gap-8 lg:w-2/3"
      >
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="input-wrapper w-full">
            <Label htmlFor="firstName" className="mb-2">
              First Name{" "}
              <span className="text-museum-teal text-xs">(required)</span>
            </Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              required
              onChange={formikFulfiller.handleChange}
              onBlur={formikFulfiller.handleBlur}
              value={formikFulfiller.values.firstName}
            />
          </div>
          <div className="input-wrapper w-full">
            <Label htmlFor="lastName" className="mb-2">
              Last Name{" "}
              <span className="text-museum-teal text-xs">(required)</span>
            </Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              required
              onChange={formikFulfiller.handleChange}
              onBlur={formikFulfiller.handleBlur}
              value={formikFulfiller.values.lastName}
            />
          </div>
        </div>

        <div className="input-wrapper">
          <Label htmlFor="email" className="mb-2">
            Email <span className="text-museum-teal text-xs">(required)</span>
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            onChange={formikFulfiller.handleChange}
            onBlur={formikFulfiller.handleBlur}
            value={formikFulfiller.values.email}
          />
        </div>

        <div className="input-wrapper">
          <Label htmlFor="classification" className="mb-2">
            Object Classification{" "}
            <span className="text-museum-teal text-xs">(required)</span>
          </Label>
          <Combobox
            items={classifications}
            autoHighlight
            id="classification"
            value={formikFulfiller.values.classification}
            onValueChange={(value) => {
              formikFulfiller.setFieldValue("classification", value);
              formikFulfiller.setFieldTouched("classification", true);
            }}
            required
          >
            <ComboboxInput placeholder="Select a classification" showClear />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <div className="input-wrapper">
          <Label htmlFor="objectName" className="mb-2">
            Object Name{" "}
            <span className="text-museum-teal text-xs">(required)</span>
          </Label>
          <Input
            type="text"
            name="objectName"
            id="objectName"
            placeholder="Ex: Aitken Bible"
            required
            onChange={formikFulfiller.handleChange}
            onBlur={formikFulfiller.handleBlur}
            value={formikFulfiller.values.objectName}
          />
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="input-wrapper w-full">
            <Label htmlFor="objectCode" className="mb-2">
              Object Code{" "}
              <span className="text-museum-teal text-xs">(required)</span>
            </Label>
            <Input
              type="text"
              name="objectCode"
              id="objectCode"
              placeholder="Ex: MOTB.BIB.004494"
              required
              onChange={formikFulfiller.handleChange}
              onBlur={formikFulfiller.handleBlur}
              value={formikFulfiller.values.objectCode}
            />
          </div>

          <div className="input-wrapper w-2/3">
            <Label htmlFor="onDisplay" className="mb-2">
              On Display?
            </Label>
            <div className="inline-flex items-center gap-2">
              <Switch
                id="onDisplay"
                className="cursor-pointer"
                checked={formikFulfiller.values.onDisplay}
                onCheckedChange={(value) => {
                  formikFulfiller.setFieldValue("onDisplay", value);
                  formikFulfiller.setFieldTouched("onDisplay", true);
                }}
              />
              {formikFulfiller.values.onDisplay ? <p>Yes</p> : <p>No</p>}
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
            onChange={formikFulfiller.handleChange}
            onBlur={formikFulfiller.handleBlur}
            value={formikFulfiller.values.objectLocation}
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
              onChange={formikFulfiller.handleChange}
              onBlur={formikFulfiller.handleBlur}
              value={formikFulfiller.values.width}
            />
            <hr className="w-8 border-black" />
            <Input
              type="text"
              name="height"
              id="height"
              placeholder="Height (H)"
              onChange={formikFulfiller.handleChange}
              onBlur={formikFulfiller.handleBlur}
              value={formikFulfiller.values.height}
            />
            <hr className="w-8 border-black" />
            <Input
              type="text"
              name="depth"
              id="depth"
              placeholder="Depth (D)"
              onChange={formikFulfiller.handleChange}
              onBlur={formikFulfiller.handleBlur}
              value={formikFulfiller.values.depth}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="input-wrapper w-full">
            <Label htmlFor="requestDueDate" className="mb-2">
              Request Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild className="w-full" id="requestDueDate">
                <Button
                  variant="outline"
                  // id="date-picker-simple"
                  className="date-picker-simple cursor-pointer justify-start font-normal"
                >
                  {formikFulfiller.values.requestDueDate ? (
                    format(formikFulfiller.values.requestDueDate, "P")
                  ) : (
                    <span className="text-gray-500">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formikFulfiller.values.requestDueDate}
                  onSelect={(date) => {
                    formikFulfiller.setFieldValue("requestDueDate", date);
                    formikFulfiller.setFieldTouched("requestDueDate", true);
                  }}
                  defaultMonth={
                    formikFulfiller.values.requestDueDate || undefined
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="input-wrapper w-full">
            <Label htmlFor="requestType" className="mb-2">
              Request Type{" "}
              <span className="text-museum-teal text-xs">(required)</span>
            </Label>
            <Select
              onValueChange={(value) => {
                formikFulfiller.setFieldValue("requestType", value);
                formikFulfiller.setFieldTouched("requestType", true);
              }}
              value={formikFulfiller.values.requestType}
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

        <hr className="border-museum-teal" />
        <p className="text-museum-teal font-semibold">Additional Information</p>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="input-wrapper w-full">
            <Label htmlFor="mule" className="mb-2">
              Mule{" "}
            </Label>
            <Input
              type="mule"
              name="mule"
              id="mule"
              placeholder="Ex: Sandra Miller"
              onChange={formikFulfiller.handleChange}
              onBlur={formikFulfiller.handleBlur}
              value={formikFulfiller.values.mule}
            />
          </div>
          <div className="input-wrapper w-full">
            <Label htmlFor="totalImageSize" className="mb-2">
              Total Image Size
            </Label>
            <Input
              type="text"
              name="totalImageSize"
              id="totalImageSize"
              placeholder="Ex: 210 GB"
              onChange={formikFulfiller.handleChange}
              onBlur={formikFulfiller.handleBlur}
              value={formikFulfiller.values.totalImageSize}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="input-wrapper w-full">
            <Label htmlFor="pulledDate" className="mb-2">
              Pulled Date
            </Label>
            <Popover>
              <PopoverTrigger asChild className="w-full" id="pulledDate">
                <Button
                  variant={"outline"}
                  // id="date-picker-simple"
                  className="date-picker-simple cursor-pointer justify-start font-normal"
                >
                  {formikFulfiller.values.pulledDate ? (
                    format(formikFulfiller.values.pulledDate, "P")
                  ) : (
                    <span className="text-gray-500">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formikFulfiller.values.pulledDate}
                  onSelect={(date) => {
                    formikFulfiller.setFieldValue("pulledDate", date);
                    formikFulfiller.setFieldTouched("pulledDate", true);
                  }}
                  defaultMonth={formikFulfiller.values.pulledDate || undefined}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="input-wrapper w-full">
            <Label htmlFor="putBackDate" className="mb-2">
              Put Back Date
            </Label>
            <Popover>
              <PopoverTrigger asChild className="w-full" id="putBackDate">
                <Button
                  variant={"outline"}
                  // id="date-picker-simple"
                  className="date-picker-simple cursor-pointer justify-start font-normal"
                >
                  {formikFulfiller.values.putBackDate ? (
                    format(formikFulfiller.values.putBackDate, "P")
                  ) : (
                    <span className="text-gray-500">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formikFulfiller.values.putBackDate}
                  onSelect={(date) => {
                    formikFulfiller.setFieldValue("putBackDate", date);
                    formikFulfiller.setFieldTouched("putBackDate", true);
                  }}
                  defaultMonth={formikFulfiller.values.putBackDate || undefined}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="input-wrapper w-full">
            <Label htmlFor="requestStartDate" className="mb-2">
              Request Start Date
            </Label>
            <Popover>
              <PopoverTrigger asChild className="w-full" id="requestStartDate">
                <Button
                  variant={"outline"}
                  // id="date-picker-simple"
                  className="date-picker-simple cursor-pointer justify-start font-normal"
                >
                  {formikFulfiller.values.requestStartDate ? (
                    format(formikFulfiller.values.requestStartDate, "P")
                  ) : (
                    <span className="text-gray-500">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formikFulfiller.values.requestStartDate}
                  onSelect={(date) => {
                    formikFulfiller.setFieldValue("requestStartDate", date);
                    formikFulfiller.setFieldTouched("requestStartDate", true);
                  }}
                  defaultMonth={
                    formikFulfiller.values.requestStartDate || undefined
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="input-wrapper w-full">
            <Label htmlFor="requestEndDate" className="mb-2">
              Request End Date
            </Label>
            <Popover>
              <PopoverTrigger asChild className="w-full" id="requestEndDate">
                <Button
                  variant={"outline"}
                  // id="date-picker-simple"
                  className="date-picker-simple cursor-pointer justify-start font-normal"
                >
                  {formikFulfiller.values.requestEndDate ? (
                    format(formikFulfiller.values.requestEndDate, "P")
                  ) : (
                    <span className="text-gray-500">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formikFulfiller.values.requestEndDate}
                  onSelect={(date) => {
                    formikFulfiller.setFieldValue("requestEndDate", date);
                    formikFulfiller.setFieldTouched("requestEndDate", true);
                  }}
                  defaultMonth={
                    formikFulfiller.values.requestEndDate || undefined
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="input-wrapper w-full">
            <Label htmlFor="requestExportDate" className="mb-2">
              Request Export Date
            </Label>

            <Popover>
              <PopoverTrigger asChild className="w-full" id="requestExportDate">
                <Button
                  variant={"outline"}
                  // id="date-picker-simple"
                  className="date-picker-simple cursor-pointer justify-start font-normal"
                >
                  {formikFulfiller.values.requestExportDate ? (
                    format(formikFulfiller.values.requestExportDate, "P")
                  ) : (
                    <span className="text-gray-500">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formikFulfiller.values.requestExportDate}
                  onSelect={(date) => {
                    formikFulfiller.setFieldValue("requestExportDate", date);
                    formikFulfiller.setFieldTouched("requestExportDate", true);
                  }}
                  defaultMonth={
                    formikFulfiller.values.requestExportDate || undefined
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="input-wrapper w-full">
          <Label htmlFor="requestStatus" className="mb-2">
            Request Status
          </Label>
          <Select
            value={formikFulfiller.values.requestStatus}
            onValueChange={(value) => {
              formikFulfiller.setFieldValue("requestStatus", value);
              formikFulfiller.setFieldTouched("requestStatus", true); // optional
            }}
          >
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Request Status" />
            </SelectTrigger>
            <SelectContent>
              {requestStatus.map((item, index) => (
                <SelectItem
                  key={index}
                  value={item.value}
                  className="cursor-pointer"
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="input-wrapper">
          <Label htmlFor="adminNotes" className="mb-2">
            Admin Notes
          </Label>
          <Textarea
            name="adminNotes"
            id="adminNotes"
            onChange={formikFulfiller.handleChange}
            onBlur={formikFulfiller.handleBlur}
            value={formikFulfiller.values.adminNotes}
          />
        </div>

        <Button
          type="submit"
          className="bg-museum-teal cursor-pointer hover:bg-teal-800"
        >
          Submit Request
        </Button>

        <CardFooter className="justify-center">
          <small className="text-center">{alert}</small>
        </CardFooter>
      </form>
    );
  }
}
