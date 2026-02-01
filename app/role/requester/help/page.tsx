"use client";
import ThreeColLayout from "@/components/mlayouts/threeColLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Help() {
  return (
    <ThreeColLayout>
      <Card className="col-span-4 mb-20 md:col-span-6 lg:col-span-10 lg:mb-0">
        <CardHeader className="text-center">
          <CardTitle>Help</CardTitle>
          <CardDescription>
            Fill out the help form below and an administrator will contact you
            soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <form
              action=""
              method="post"
              className="flex w-full flex-col gap-8 md:w-2/3"
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
                    defaultValue={"firstName"}
                    placeholder="First Name"
                    required
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
                    defaultValue={"lastName"}
                    placeholder="Last Name"
                    required
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
                  name="email"
                  id="email"
                  defaultValue={"email@gmail.com"}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input-wrapper">
                <Label htmlFor="message" className="mb-2">
                  Message{" "}
                  <span className="text-museum-dark-orange text-xs">
                    (required)
                  </span>
                </Label>
                <Textarea name="message" id="message" required></Textarea>
              </div>
              <Button
                type="submit"
                className="bg-museum-orange hover:bg-museum-dark-orange w-full cursor-pointer"
              >
                Send Message
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
