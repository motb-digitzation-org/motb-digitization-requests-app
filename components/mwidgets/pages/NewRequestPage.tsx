"use client";
import { getGlobalUser, UserInterface } from "@/app/database/utils";
import ThreeColLayout from "@/components/mlayouts/threeColLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import NewRequestForm from "../mforms/NewRequestForm";

export default function NewRequestPage() {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [alert, setAlert] = useState<string>("");

  useEffect(() => {
    function getUserLocal() {
      setUser(getGlobalUser());
    }
    getUserLocal();
  }, []);

  if (user) {
    return (
      <ThreeColLayout navRole={user.role}>
        <Card className="col-span-4 mb-20 overflow-y-auto md:col-span-6 lg:col-span-10 lg:mb-0">
          <CardHeader className="text-center">
            <CardTitle>New Request</CardTitle>
            <CardDescription>
              Fill out the form below to submit a new digitisation request.
              <br /> You can submit multiple requests of the same object.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              <NewRequestForm user={user} />
            </div>
          </CardContent>
        </Card>
      </ThreeColLayout>
    );
  } else {
    // TODO: make look pretty
    return (
      <div>
        <p>You&apos;re not logged in</p>
      </div>
    );
  }
}
