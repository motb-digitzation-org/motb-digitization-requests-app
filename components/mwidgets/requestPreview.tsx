"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface RequestPreviewProps {
  index: number;
  selectedRequest: number | null;
  objectCode: string;
  requestType: string;
  requestStatus: string;
}

export default function RequestPreview({
  index,
  selectedRequest,
  objectCode,
  requestType,
  requestStatus,
}: RequestPreviewProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function updateIsMobile() {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    updateIsMobile();

    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  function requestStatusColour(requestStatus: string) {
    switch (requestStatus) {
      case "Created":
        return "border-gray-400 bg-gray-400";
      case "In Progress":
        return "border-orange-400 bg-orange-400";
      case "Done":
        return "border-green-400 bg-green-400";
      case "Abandoned":
        return "border-red-400 bg-red-400";
    }
  }

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger className="w-full">
          <div
            className={`mobile-display ${index % 2 ? `bg-white` : `bg-gray-200`} flex cursor-pointer items-baseline gap-3 rounded-sm p-3 transition-colors duration-300 ease-in-out hover:bg-gray-300`}
          >
            <div className="text-left">
              <p className="font-bold">{objectCode.toLocaleUpperCase()}</p>
              <p className="text-xs text-gray-700">
                {requestType.toLocaleUpperCase()}
              </p>
            </div>

            <div
              className={`h-3 w-3 rounded-3xl border-2 ${requestStatusColour(requestStatus)}`}
            ></div>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Request Details</SheetTitle>
            <SheetDescription></SheetDescription>
            <p className="mb-2">Object Classification</p>

            <p className="mb-2">Object Name</p>

            <p className="mb-2">Object Code</p>

            <p className="mb-2">Tier</p>

            <p className="mb-2">On Display?</p>

            <p className="mb-2">Object Location</p>

            <p className="mb-2">Dimensions</p>

            <p className="mb-2">Request Due Date</p>

            <p className="mb-2">Request Type</p>

            <p className="mb-2">Additional Notes</p>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button className="cursor-pointer">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  } else {
    return (
      <div
        className={`desktop-display ${selectedRequest && selectedRequest == index ? `bg-museum-teal` : index % 2 ? `bg-gray-100` : `bg-gray-200`} flex cursor-pointer justify-between rounded-sm p-3 transition-colors duration-300 ease-in-out hover:bg-gray-300`}
      >
        <div className="text-left">
          <p className="font-bold">{objectCode.toLocaleUpperCase()}</p>
          <p className="text-xs text-gray-700">
            {requestType.toLocaleUpperCase()}
          </p>
        </div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-xs">{requestStatus}</p>
            <div
              className={`h-3 w-3 rounded-3xl border-2 ${requestStatusColour(requestStatus)}`}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
