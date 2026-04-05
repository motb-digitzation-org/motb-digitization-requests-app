"use client";
import { createUser } from "@/app/database/actions/userActions";
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
import { useFormik } from "formik";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RequestAccess() {
  const [alert, setAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "requester",
    },
    onSubmit: async (values) => {
      const response = await createUser(
        values.firstName,
        values.lastName,
        values.email,
        values.role as "requester" | "fulfiller",
      );

      if (response.success) {
        setAlertMessage(
          " Thank you for your submission. Please go to the login page to log in.",
        );
        formik.resetForm();
      } else {
        setAlertMessage(
          response.message === "User already exists"
            ? "This email already exists. Please login."
            : "There was an error registering. Please try again or contact the admin.",
        );
      }
      setAlert(true);
    },
  });

  return (
    <div className="grid h-screen grid-cols-4 items-center bg-gray-300 p-4 md:grid-cols-6 lg:grid-cols-12">
      <Card className="col-span-4 md:col-start-2 lg:col-span-8 lg:col-start-3">
        <CardContent className="grid grid-cols-1 gap-4 lg:h-full lg:grid-cols-2">
          <div className="image-wrapper hidden lg:relative lg:inline-block">
            <Image
              src={"/MOTB-BG-Img-2.jpg"}
              alt="dd"
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
              <CardTitle>Request Access</CardTitle>
              <CardDescription>
                Request access to the application.
              </CardDescription>
            </div>
            <form
              className="flex flex-col gap-8"
              onSubmit={formik.handleSubmit}
            >
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              <div className="input-wrapper">
                <Label htmlFor="" className="mb-2">
                  Select your role:{" "}
                  <span className="text-museum-dark-orange text-xs">
                    (required)
                  </span>
                </Label>
                <RadioGroup
                  defaultValue={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="role"
                  name="role"
                  onValueChange={(value) => {
                    formik.setFieldValue("role", value);
                    formik.setFieldTouched("role", true);
                  }}
                  required
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="requester" id="requester" />
                    <Label htmlFor="requester">
                      Requester - Requests objects for digitization
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="fulfiller" id="fulfiller" />
                    <Label htmlFor="fulfiller">
                      Fulfiller - Digitizes objects (= Admin Access)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-museum-orange hover:bg-museum-dark-orange w-full cursor-pointer"
                  onClick={() => {
                    setAlert(true);
                  }}
                >
                  Sign Up
                </Button>
                {alert ? (
                  <small>{alertMessage}</small>
                ) : (
                  <small className="text-white cursor-default">Empty</small>
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
