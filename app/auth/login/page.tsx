"use client";
import { getUser } from "@/app/database/actions/userActions";
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
import { useFormik } from "formik";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [alert, setAlert] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      const response = await getUser(values.email);

      if (response) {
        window.sessionStorage.setItem("user", JSON.stringify(response[0]));
        if (response[0].role === "requester") {
          router.push("/requests");
        } else {
          router.push("/admin/requests");
        }
      }
      setAlert(true);
    },
  });

  return (
    <div className="grid h-screen grid-cols-4 items-center p-4 md:grid-cols-6 lg:grid-cols-12">
      <Card className="col-span-4 md:col-start-2 lg:col-span-8 lg:col-start-3">
        <CardContent className="grid grid-cols-1 gap-4 lg:h-full lg:grid-cols-2">
          <div className="image-wrapper hidden lg:relative lg:inline-block">
            <Image
              src={"/MOTB-BG-Img-1.jpg"}
              alt={"museum of the bible"}
              fill={true}
              objectFit="cover"
              className="rounded-md"
            />
          </div>

          <div className="card-content">
            <div className="card-header mb-4">
              <Link href={"/"} className="mb-4 flex flex-row items-center">
                <ChevronLeft className="h-4 w-4" />
                <small className="">Home</small>
              </Link>

              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login to access the requests application.
              </CardDescription>
            </div>

            <form
              className="flex flex-col gap-8"
              onSubmit={formik.handleSubmit}
            >
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
                  placeholder="Email"
                  required
                  autoComplete="true"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-museum-orange hover:bg-museum-dark-orange w-full cursor-pointer"
                >
                  Login
                </Button>
                {alert ? (
                  <small>
                    There was an error logging in. Please try again, request
                    access, or contact your administrator.
                  </small>
                ) : (
                  <small className="cursor-default text-white">Empty</small>
                )}
              </div>
            </form>
            <div className="spacer lg:h-50"></div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <small>
            Don&apos;t have an account?{" "}
            <Link href={"/auth/request-access"} className="underline">
              Request Access
            </Link>
            .
          </small>
        </CardFooter>
      </Card>
    </div>
  );
}
