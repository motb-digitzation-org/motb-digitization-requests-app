"use client";
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
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [alert, setAlert] = useState<boolean>(false);

  return (
    <div className="grid h-screen grid-cols-4 items-center bg-gray-300 p-4 md:grid-cols-6 lg:grid-cols-12">
      <Card className="col-span-4 md:col-start-2 lg:col-span-6 lg:col-start-4">
        <CardHeader>
          <div>
            <button
              type="button"
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </button>
            <button
              className="mr-2"
              onClick={() => {
                router.push("/role/admin/home");
              }}
            >
              Admin Home
            </button>
            <button
              onClick={() => {
                router.push("/role/requester/home");
              }}
            >
              Request Home
            </button>
          </div>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to access the requests application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="" method="post" className="flex flex-col gap-8">
            <div>
              <Label htmlFor="email" className="mb-2">
                Email <span className="text-xs text-red-400">(required)</span>
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                autoComplete="true"
              />
            </div>
            <Button type="submit" className="cursor-pointer">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center text-center">
          {alert ? (
            <small>
              There was an error logging in. Please try again or contact your
              administrator.
            </small>
          ) : (
            <small></small>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
