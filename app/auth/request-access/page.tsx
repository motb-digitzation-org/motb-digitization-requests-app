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

export default function RequestAccess() {
  const router = useRouter();

  return (
    <div>
      <button
        className="mb-4"
        onClick={() => {
          router.push("/");
        }}
      >
        Home
      </button>

      <Card>
        <CardHeader>
          <CardTitle>Request Access</CardTitle>
          <CardDescription>Request access to the application.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="" method="post" className="flex flex-col gap-4">
            <div>
              <Label htmlFor="first-name" className="">
                First Name
              </Label>
              <Input type="text" placeholder="First Name" id="first-Name" />
            </div>
            <div>
              <Label htmlFor="last-name">Last Name</Label>
              <Input type="text" placeholder="Last Name" id="last-name" />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="Email" id="email" />
            </div>

            <div>
              <Label htmlFor="">Select your role</Label>
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="requester" id="requester" />
                  <Label htmlFor="requester">
                    Requester - Wishes to request objects
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
              onClick={() => {
                router.push("/role/requester/home");
              }}
            >
              Request Access
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center flex flex-col justify-center items-center">
          <small>Thank you for your submission. </small>
        </CardFooter>
      </Card>
    </div>
  );
}
