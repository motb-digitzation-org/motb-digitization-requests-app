import ThreeColLayout from "@/components/mlayouts/threeColLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RequestHome() {
  return (
    <ThreeColLayout>
      <Card className="col-span-4 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
          <CardDescription>
            Below is a list of all your requests.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
        {/* TODO: insert a list of request previews */}
        </CardContent>
      </Card>

      <Card className="hidden md:col-span-4 md:block lg:col-span-7">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: insert details of selected request */}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </ThreeColLayout>
  );
}
