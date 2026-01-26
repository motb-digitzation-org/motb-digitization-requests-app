import ThreeColLayout from "@/components/mlayouts/threeColLayout";
import RequestPreview from "@/components/mwidgets/requestPreview";
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
      <Card className="col-span-4 h-[40vh] md:col-span-3 md:mb-16 md:h-[85vh] lg:col-span-4 lg:mb-0 lg:h-[95vh]">
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
          <CardDescription>
            Below is a list of all your requests.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-y-scroll">
          {/* TODO: insert a list of request previews */}
          <div className="grid grid-flow-row auto-rows-auto gap-2">
            <RequestPreview index={0} />
            <RequestPreview index={1} />
            <RequestPreview index={2} />
            <RequestPreview index={3} />
            <RequestPreview index={4} />
            <RequestPreview index={5} />
            <RequestPreview index={6} />
            <RequestPreview index={7} />
            <RequestPreview index={8} />
            <RequestPreview index={9} />
            <RequestPreview index={10} />
            <RequestPreview index={11} />
            <RequestPreview index={12} />
            <RequestPreview index={13} />
            <RequestPreview index={14} />
            <RequestPreview index={15} />
            <RequestPreview index={16} />
            <RequestPreview index={17} />
            <p className="my-2 text-center text-xs text-gray-500">
              End of requests.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-4 mb-16 md:col-span-3 lg:col-span-6 lg:mb-0">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: insert details of selected request */}
          <p>Hello world</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </ThreeColLayout>
  );
}
