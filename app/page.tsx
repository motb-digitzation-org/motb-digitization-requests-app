"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    document.body.style.backgroundColor = "white";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <main className="h-screen overflow-y-auto p-4">
      <Button
        onClick={() => {
          router.push("/admin/requests");
        }}
      >
        Admin
      </Button>
      <Button
        onClick={() => {
          router.push("/requests");
        }}
      >
        User
      </Button>
      <h1 className="my-2">Welcome to the Digitisation Requests Portal</h1>
      <div className="my-2">
        <h2>What This Application Does</h2>
        <p>
          The Digitisation Requests Portal is a centralised system for
          submitting, tracking, and managing digitisation requests. This
          platform allows staff to request physical materials for digitisation
          and provides administrators with the tools to review, process, and
          fulfill those requests. All requests are recorded, tracked, and
          updated within the system to ensure transparency, accountability, and
          clear communication throughout the digitisation process.
        </p>
      </div>
      <div className="my-4">
        <h2>How the System Works</h2>
        <p>
          The application operates using role-based access, requesters and
          administrators can do the following:
        </p>
        <div className="my-2 grid grid-cols-2 gap-4 md:grid-cols-3">
          <h3 className="font-bold">Requesters</h3>
          <ul className="list-disc">
            <li>Submit new digitisation requests</li>
            <li>View the status of their submitted requests</li>
            <li>Track updates and changes</li>
            <li>Access request history</li>
          </ul>
        </div>
        <div className="my-2 grid grid-cols-2 gap-4 md:grid-cols-3">
          <h3 className="font-bold">Fulfillers / Administrators</h3>
          <ul className="list-disc">
            <li>View all submitted requests</li>
            <li>Update request status</li>
            <li>Edit request details when necessary</li>
            <li>Manage income access requests</li>
          </ul>
        </div>
        <p>
          All activity within the system is tracked to maintain clear records of
          each request&apos;s progress.
        </p>
      </div>

      <div className="my-4">
        <h2>Getting Started</h2>
        <p>To begin using the system:</p>
        <ul className="mx-6 list-disc">
          <li>
            Click the <span className="font-bold">Login</span> button if you
            already have an approved account.
          </li>
          <ul className="mx-6 my-4 list-disc">
            <li>
              If you do not yet have access, click{" "}
              <span className="font-bold">Request Access</span> button.
            </li>
            <li>Select the appropriate role and submit your access request.</li>
            <li>A system administrator will review and approve your request</li>
          </ul>
          <li>
            Once approved, you may log in and begin submitting or managing
            digitisation requests.
          </li>
        </ul>
        <p className="my-2">
          Please note: Access must be approved before full functionality is
          available.
        </p>

        <div className="button-wrapper lx:grid-cols-8 mb-8 grid grid-cols-4 gap-4 md:grid-cols-6">
          <Button
            className="bg-museum-orange hover:bg-museum-dark-orange cursor-pointer font-bold"
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Login
          </Button>
          <Button
            className="bg-museum-teal cursor-pointer font-bold hover:bg-teal-800"
            onClick={() => {
              router.push("/auth/request-access");
            }}
          >
            Request Access
          </Button>
        </div>
      </div>

      <div className="my-4">
        <h2>Request Lifecycle Overview</h2>
        <ol className="mx-6 list-disc">
          <li>A requester submits a digitisation request.</li>
          <li>An administrator reviews the submission.</li>
          <li>
            The request status is updated as it moves through the digitisation
            process.
          </li>
          <li>
            The requester can monitor progress directly within the portal.
          </li>
          <li>Once completed, the request is marked as fulfilled.</li>
        </ol>
      </div>

      <div className="my-4">
        <h2>Need Assistance?</h2>
        If you experience technical issues, have questions about your request,
        or require help accessing the system, please contact: [Name] Email:
        [email] Phone: [phone]
        <p className="my-2">
          For issues related to account access or role approval, please
          reference your full name and the email used during registration.
        </p>
      </div>
    </main>
  );
}
