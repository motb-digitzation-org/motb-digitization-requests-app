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

export default function Login() {
  const router = useRouter();
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          router.push("/");
        }}
      >
        Home
      </button>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to access the requests application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="" method="post">
            <Label htmlFor="">Email</Label>
            <Input type="email" />
          </form>
        </CardContent>
        <CardFooter className="text-center flex flex-col justify-center items-center">
          <small>There was an error logging in.</small>
        </CardFooter>
      </Card>
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
  );
}
