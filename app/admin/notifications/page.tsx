"use client";
import ThreeColLayout from "@/components/mlayouts/threeColLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminNotifications() {
  return (
    <ThreeColLayout navRole={"admin"}>
      <Card className="col-span-4 mb-20 overflow-y-auto md:col-span-6 lg:col-span-10 lg:mb-0">
        <CardHeader className="text-center">
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
          What should this page be used for?
          </CardDescription>
        </CardHeader>
        <CardContent>
					
        </CardContent>
        <CardFooter className="justify-center"></CardFooter>
      </Card>
    </ThreeColLayout>
  );
}
