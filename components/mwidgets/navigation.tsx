"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { CircleQuestionMark, House, Plus, Settings } from "lucide-react";
import { ReactElement } from "react";
import { useRouter } from "next/navigation";

interface NavigationProps {
  selected: boolean;
}

export default function Navigation() {
  const navigationList: { label: string; icon: ReactElement; link: string }[] =
    [
      { label: "Home", icon: <House />, link: "/role/requester/home" },
      { label: "New Request", icon: <Plus />, link: "/role/requester/home" },
      { label: "Help", icon: <CircleQuestionMark />, link: "/role/requester/home" },
      { label: "Settings", icon: <Settings />, link: "/role/requester/home" },
    ];

  const router = useRouter();

  return (
    <nav className="main-navigation grid grid-cols-4 gap-2 p-2 lg:grid-cols-1">
      {navigationList.map((item, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              className="w-full cursor-pointer flex flex-row lg:justify-start items-center"
              onClick={() => {
                router.push(item.link)
              }}
            >
              {item.icon}{" "}
              <span className="hidden lg:inline-block">{item.label}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </nav>
  );
}
