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
import { useState } from "react";

export default function NewRequest() {
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

  const [date, setDate] = useState<Date>(); // used for request due date
  const [checked, setChecked] = useState<boolean>(false); // tracks onDisplay

  return (
    <ThreeColLayout>
      <Card className="col-span-4 mb-20 md:col-span-6 lg:col-span-10 lg:mb-0">
        <CardHeader className="text-center">
          <CardTitle>New Request</CardTitle>
          <CardDescription>
            Fill out the help form below to submit a new digitisation request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <form
              action=""
              method="post"
              className="flex w-full flex-col gap-8 lg:w-2/3"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="input-wrapper">
                  <Label htmlFor="firstName" className="mb-2">
                    First Name{" "}
                    <span className="text-xs text-red-400">(required)</span>
                  </Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    defaultValue={"firstName"}
                  />
                </div>
                <div className="input-wrapper">
                  <Label htmlFor="lastName" className="mb-2">
                    Last Name{" "}
                    <span className="text-xs text-red-400">(required)</span>
                  </Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    defaultValue={"lastName"}
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <Label htmlFor="email" className="mb-2">
                  Email <span className="text-xs text-red-400">(required)</span>
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={"email@gmail.com"}
                />
              </div>

              <div className="input-wrapper">
                <Label htmlFor="classification" className="mb-2">
                  Object Classification{" "}
                  <span className="text-xs text-red-400">(required)</span>
                </Label>
                <Combobox
                  items={classifications}
                  autoHighlight
                  name="classification"
                  id="classification"
                >
                  <ComboboxInput
                    placeholder="Select a classification"
                    showClear
                    required
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

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-4">
                <div className="input-wrapper">
                  <Label htmlFor="objectCode" className="mb-2">
                    Object Code{" "}
                    <span className="text-xs text-red-400">(required)</span>
                  </Label>
                  <Input
                    type="text"
                    name="objectCode"
                    id="objectCode"
                    placeholder="Ex: MOTB.BIB.004494"
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <Label htmlFor="objectName" className="mb-2">
                    Object Name{" "}
                    <span className="text-xs text-red-400">(required)</span>
                  </Label>
                  <Input
                    type="text"
                    name="objectName"
                    id="objectName"
                    placeholder="Ex: Aitken Bible"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="input-wrapper">
                  <Label htmlFor="tier" className="mb-2">
                    Tier{" "}
                    <span className="text-xs text-red-400">(required)</span>
                  </Label>
                  <Select name="tier" required>
                    <SelectTrigger className="w-full" name="tier" id="tier">
                      <SelectValue placeholder="Tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tier-1">Tier 1</SelectItem>
                      <SelectItem value="tier-2">Tier 2</SelectItem>
                      <SelectItem value="tier-3">Tier 3</SelectItem>
                      <SelectItem value="tier-4">Tier 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="input-wrapper">
                  <Label htmlFor="onDisplay" className="mb-2">
                    On Display?{" "}
                    <span className="text-xs text-red-400">(required)</span>
                  </Label>
                  <div className="inline-flex items-center gap-2">
                    <Switch
                      name="onDisplay"
                      id="onDisplay"
                      className="cursor-pointer"
                      onCheckedChange={() => {
                        setChecked(!checked);
                      }}
                    />
                    {checked ? <p>Yes</p> : <p>No</p>}
                  </div>
                </div>
              </div>

              <div className="input-wrapper">
                <Label htmlFor="objectLocation" className="mb-2">
                  Object Location{" "}
                  <span className="text-xs text-red-400">(required)</span>
                </Label>
                <Input
                  type="text"
                  name="objectLocation"
                  id="objectLocation"
                  placeholder="Ex: Cabinet 9, Shelf 7"
                  required
                />
              </div>

              <div className="input-wrapper">
                <Label htmlFor="" className="mb-2">
                  Dimensions{" "}
                  <span className="text-xs text-red-400">(required)</span>
                </Label>
                <div className="flex flex-row items-center justify-between">
                  <Input
                    type="text"
                    name="width"
                    id="width"
                    placeholder="Width (W)"
                    required
                  />
                  <hr className="w-8 border-black" />
                  <Input
                    type="text"
                    name="height"
                    id="height"
                    placeholder="Height (H)"
                    required
                  />
                  <hr className="w-8 border-black" />
                  <Input
                    type="text"
                    name="depth"
                    id="depth"
                    placeholder="Depth (D)"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-4">
                <div className="input-wrapper">
                  <Label htmlFor="requestDueDate" className="mb-2">
                    Request Due Date
                  </Label>
                  <Popover>
                    <PopoverTrigger
                      asChild
                      className="w-full"
                      name="requestDueDate"
                      id="requestDueDate"
                    >
                      <Button
                        variant="outline"
                        id="date-picker-simple"
                        className="justify-start font-normal"
                      >
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span className="text-gray-500">Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="input-wrapper">
                  <Label htmlFor="requestType" className="mb-2">
                    Request Type{" "}
                    <span className="text-xs text-red-400">(required)</span>
                  </Label>
                  <Select required name="requestType">
                    <SelectTrigger
                      className="w-full"
                      name="requestType"
                      id="requestType"
                    >
                      <SelectValue placeholder="Request Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bc100">BC100</SelectItem>
                      <SelectItem value="tsr">
                        Torah Scroll Rig (TSR)
                      </SelectItem>
                      <SelectItem value="msi">
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
                <Textarea name="additionalNotes" id="additionalNotes" />
              </div>

              <Button type="submit" className="w-full cursor-pointer">
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
