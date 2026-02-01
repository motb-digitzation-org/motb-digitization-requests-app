"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RequestAccess() {
  const router = useRouter();
  const [alert, setAlert] = useState<boolean>(false);

  return (
    <div className="grid h-screen grid-cols-4 items-center bg-gray-300 p-4 md:grid-cols-6 lg:grid-cols-12">
      <Card className="col-span-4 md:col-start-2 lg:col-span-8 lg:col-start-3 lg:h-[80vh]">
        <CardContent className="grid grid-cols-1 gap-4 lg:h-full lg:grid-cols-2">
          <div className="image-wrapper hidden lg:relative lg:inline-block">
            <Image
              src={"/MOTB-BG-Img-2.jpg"}
              alt="dd"
              fill={"true"}
              objectFit="cover"
            />
          </div>

          <div className="card-content">
            <div className="card-header mb-4">
              <Link href={"/"} className="mb-4 flex flex-row items-center">
                <ChevronLeft className="h-4 w-4" />
                <small className="">Home</small>
              </Link>
              <CardTitle>Request Access</CardTitle>
              <CardDescription>
                Request access to the application.
              </CardDescription>
            </div>
            <form action="" method="post" className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="input-wrapper">
                  <Label htmlFor="first-name" className="mb-2">
                    First Name{" "}
                    <span className="text-museum-dark-orange text-xs">
                      (required)
                    </span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    id="firstName"
                    required
                    autoComplete="true"
                  />
                </div>
                <div className="input-wrapper">
                  <Label htmlFor="last-name" className="mb-2">
                    Last Name{" "}
                    <span className="text-museum-dark-orange text-xs">
                      (required)
                    </span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    id="lastName"
                    required
                    autoComplete="true"
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
                  placeholder="Email"
                  name="email"
                  id="email"
                  required
                  autoComplete="true"
                />
              </div>
              <div className="input-wrapper">
                <Label htmlFor="" className="mb-2">
                  Select your role:{" "}
                  <span className="text-museum-dark-orange text-xs">
                    (required)
                  </span>
                </Label>
                <RadioGroup defaultValue="requester">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="requester" id="requester" />
                    <Label htmlFor="requester">
                      Requester - Requests objects for digitization
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="fulfiller" id="fulfiller" />
                    <Label htmlFor="fulfiller">
                      Fulfiller - Digitises objects
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="text-center">
                <Button
                  type="button"
                  className="bg-museum-orange hover:bg-museum-dark-orange w-full cursor-pointer"
                  onClick={() => {
                    setAlert(true);
                  }}
                >
                  Request Access
                </Button>
                {alert ? (
                  <small>
                    Thank you for your submission. An admin will contact you
                    soon.
                  </small>
                ) : (
                  <small className="invisible">Empty</small>
                )}
              </div>
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <small>
            Have an account?{" "}
            <Link href={"/auth/login"} className="underline">
              Login
            </Link>
            .
          </small>
        </CardFooter>
      </Card>
    </div>
  );
}
