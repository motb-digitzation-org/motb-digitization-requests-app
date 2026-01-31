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
}
export default function RequestPreview({ index }: RequestPreviewProps) {
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

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger>
          <div
            className={`mobile-display ${index % 2 ? `bg-white` : `bg-gray-200`} flex cursor-pointer justify-between rounded-sm p-3 transition-colors duration-300 ease-in-out hover:bg-gray-300`}
          >
            <div className="text-left">
              <p className="font-bold">Object Name</p>
              <p className="text-xs text-gray-700">Object Code</p>
            </div>
            <div>
              <div className="flex flex-row items-center gap-2">
                <p className="text-xs">Request Status</p>
                <div className="h-3 w-3 rounded-3xl border-2 border-green-400 bg-green-400"></div>
              </div>
              <p className="text-right text-xs text-gray-700">Request Type</p>
            </div>
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
        className={`tdesktop-display ${index % 2 ? `bg-white` : `bg-gray-200`} flex cursor-pointer justify-between rounded-sm p-3 transition-colors duration-300 ease-in-out hover:bg-gray-300`}
      >
        <div className="text-left">
          <p className="font-bold">Object Name</p>
          <p className="text-xs text-gray-700">Object Code</p>
        </div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-xs">Request Status</p>
            <div className="h-3 w-3 rounded-3xl border-2 border-green-400 bg-green-400"></div>
          </div>
          <p className="text-right text-xs text-gray-700">Request Type</p>
        </div>
      </div>
    );
  }
}
