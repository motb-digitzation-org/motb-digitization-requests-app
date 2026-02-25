"use client";
import ThreeColLayout from "@/components/mlayouts/threeColLayout";
import RequestPreview from "@/components/mwidgets/requestPreview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function RequestsPage() {
  const [role, setRole] = useState<"requester" | "admin">("requester");

  useEffect(() => {
    function getRole() {
      setRole("admin");
    }

    getRole();
  }, []);

  return (
    <ThreeColLayout navRole={role}>
      <Card className="col-span-4 mb-20 overflow-y-auto md:col-span-6 lg:col-span-4 lg:mb-0">
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
          <CardDescription className="mb-2">
            Below is a list of all your requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: insert a list of request previews */}
          <div className="flex flex-col">
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
      <Card className="hidden overflow-y-auto lg:col-span-6 lg:block">
        <CardContent>
          <div className="request-details">
            <div className="request-info mb-4">
              <p className="font-bold">Object Classification</p>
              <p>[content]</p>
            </div>
            <div className="request-info mb-4">
              <p className="font-bold">Object Name</p>
              <p>[content]</p>
            </div>
            <div className="request-info mb-4">
              <p className="font-bold">Object Code</p>
              <p>[content]</p>
            </div>
            <div className="request-info mb-4">
              <p className="">Tier</p>
              <p>[content]</p>
            </div>
            <div className="request-info mb-4">
              <p className="font-bold">On Display?</p>
              <p>[content]</p>
            </div>
            <div className="request-info mb-4">
              <p className="font-bold">Object Location</p>
              <p>[content]</p>
            </div>
            <div className="request-info mb-4">
              <p className="font-bold">Dimensions</p>
              <p>[content]</p>
            </div>
            <div className="request-info mb-4">
              <p className="font-bold">Request Due Date</p>
              <p>[content]</p>
            </div>
            <div className="request-info mb-4">
              <p className="font-bold">Request Type</p>
              <p>[content]</p>
            </div>
            <div className="request-info mb-4">
              <p className="font-bold">Additional Notes</p>
              <p>[content]</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ThreeColLayout>
  );
}
