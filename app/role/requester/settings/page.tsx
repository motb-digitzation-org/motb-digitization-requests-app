"use client";
import ThreeColLayout from "@/components/mlayouts/threeColLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Settings() {
  return (
    <ThreeColLayout>
      <Card className="col-span-4 md:col-span-6 lg:col-span-10">
        <CardHeader className="text-center">
          <CardTitle>Settings</CardTitle>
          <CardDescription>Your account settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <form
              action=""
              method="post"
              className="flex flex-col gap-8 lg:w-2/3"
            >
              <div className="wrapper">
                <Label>First Name</Label>
                <p>firstName here</p>
              </div>

              <div className="input-wrapper">
                <Label htmlFor="firstName" className="mb-2">
                  First Name
                </Label>
                <Input type="text" name="firstName" id="firstName" />
              </div>

              <div className="wrapper">
                <Label>Last Name</Label>
                <p>lastName here</p>
              </div>

              <div className="input-wrapper">
                <Label htmlFor="lastName" className="mb-2">
                  Last Name
                </Label>
                <Input type="text" name="lastName" id="lastName" />
              </div>
              <div className="wrapper">
                <Label>Email</Label>
                <p>email here</p>
              </div>
              <div className="input-wrapper">
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input type="email" name="email" id="email" />
              </div>
              <Button type="submit" className="col-start-2">
                Save Changes
              </Button>
              <small className="col-start-2 text-center">
                Your changes have been saved.
              </small>
            </form>
            <div className="my-4 flex flex-row gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant={"destructive"}
                    type="button"
                    className="cursor-pointer"
                  >
                    Delete All Requests
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      all of your digitization requests from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <Button type="submit" className="cursor-pointer">
                    I&apos;m sure, delete all requests
                  </Button>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant={"destructive"}
                    type="button"
                    className="cursor-pointer"
                  >
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <Button type="submit" className="cursor-pointer">
                    I&apos;m sure, delete my account
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </ThreeColLayout>
  );
}
