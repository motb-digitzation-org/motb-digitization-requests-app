"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RequestAccess() {
  const router = useRouter();
  const [alert, setAlert] = useState<boolean>(false);

  return (
    <div className="grid h-screen grid-cols-4 items-center bg-gray-300 p-4 md:grid-cols-6 lg:grid-cols-12">
      <Card className="col-span-4 md:col-start-2 lg:col-span-6 lg:col-start-4">
        <CardHeader>
          <button
            className="mb-4"
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </button>
          <CardTitle>Request Access</CardTitle>
          <CardDescription>Request access to the application.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="" method="post" className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first-name" className="mb-2">
                  First Name{" "}
                  <span className="text-xs text-red-400">(required)</span>
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
              <div>
                <Label htmlFor="last-name" className="mb-2">
                  Last Name{" "}
                  <span className="text-xs text-red-400">(required)</span>
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

            <div>
              <Label htmlFor="email" className="mb-2">
                Email <span className="text-xs text-red-400">(required)</span>
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

            <div>
              <Label htmlFor="" className="mb-2">
                Select your role:{" "}
                <span className="text-xs text-red-400">(required)</span>
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

            <Button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                setAlert(true);
              }}
            >
              Request Access
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center text-center">
          {alert ? (
            <small>
              Thank you for your submission. An admin will contact you soon.
            </small>
          ) : (
            <small></small>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
