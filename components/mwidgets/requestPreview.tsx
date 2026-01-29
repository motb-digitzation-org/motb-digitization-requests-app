"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
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
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>This action cannot be undone.</SheetDescription>
            jioji
          </SheetHeader>
          <SheetFooter>
            <SheetClose>Close</SheetClose>
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
