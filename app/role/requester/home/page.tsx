"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navigation from "@/components/mwidgets/navigation";

export default function RequestHome() {
  return (
    <div className="grid h-screen grid-cols-3 gap-2 bg-gray-300 p-4 md:grid-cols-6 lg:grid-cols-12">
      <div className="fixed bottom-0 left-0 w-screen lg:static lg:col-span-2 lg:flex lg:w-auto lg:flex-row lg:p-0">
        <Card className="rounded-none border-0 bg-gray-900/45 p-2 lg:w-screen lg:rounded-xl lg:bg-white lg:py-6">
          <Navigation />
        </Card>
      </div>

      <Card className="col-span-4 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Digitization Requests</CardTitle>
          <CardDescription>
            Below is a list of all your digitization requests.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>

      <Card className="hidden md:col-span-4 md:block lg:col-span-7">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
