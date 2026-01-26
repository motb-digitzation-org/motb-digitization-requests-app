"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { CircleQuestionMark, House, LogOut, Plus, Settings } from "lucide-react";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const navigationList: { label: string; icon: ReactElement; link: string }[] =
    [
      { label: "Home", icon: <House />, link: "/role/requester/home" },
      {
        label: "New Request",
        icon: <Plus />,
        link: "/role/requester/new-request",
      },
      {
        label: "Help",
        icon: <CircleQuestionMark />,
        link: "/role/requester/help",
      },
      {
        label: "Settings",
        icon: <Settings />,
        link: "/role/requester/settings",
      },
      {
        label: "Logout",
        icon: <LogOut />,
        link: "/"
      }
    ];

  const router = useRouter();

  // ---- dynamically switch between "right" and "left" based on screen size
  const [side, setSide] = useState<"top" | "right">("top");

  useEffect(() => {
    function updateSide() {
      if (window.innerWidth >= 1024) {
        setSide("right");
      } else {
        setSide("top");
      }
    }

    updateSide(); // initialise the function

    window.addEventListener("resize", updateSide); // listen to window resize events
    return () => window.removeEventListener("resize", updateSide); // unmount listener
  }, []);

  return (
    <nav id="navigation" className={`grid grid-cols-${navigationList.length} gap-2 p-2 lg:grid-cols-1`}>
      {navigationList.map((item, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              className="flex w-full cursor-pointer flex-row items-center lg:justify-start"
              onClick={() => {
                router.push(item.link);
              }}
            >
              {item.icon}{" "}
              <span className="hidden lg:inline-block">{item.label}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </nav>
  );
}
