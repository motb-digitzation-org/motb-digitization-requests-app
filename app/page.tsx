"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="p-4 overflow-y-auto h-screen">
     
      <Button
        onClick={() => {
          router.push("/auth/request-access");
        }}
      >
        Request Access
      </Button>

      <Button
        onClick={() => {
          router.push("/auth/login");
        }}
      >
        Login
      </Button>

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

      <h1>Welcome to the Digitisation Requests Portal</
      h1>

      <h2>What This Application Does</h2>

      <p>
        The Digitisation Requests Portal is a centralised system for submitting, tracking, and managing digitisation requests.

        This platform allows staff to request physical materials for digitisation and provides administrators with the tools to review, process, and fulfill those requests.

        All requests are recorded, tracked, and updated within the system to ensure transparency, accountability, and clear communication throughout the digitisation process.

      </p>

      <h2>How the System Works</h2>

      <p>
        The application operates using role-based access:
      </p>

      <h3>Requesters</h3>

      <p>Requesters can:</p>
      <ul>
        <li>Submit new digitisation requests</li>
        <li>View the status of their submitted requests</li>
        <li>Track updates and changes</li>
        <li>Access request history</li>
      </ul>

      <h3>Fulfillers / Administrators</h3>
      <p>Administrators can:</p>

      <ul>
        <li>View all submitted requests</li>
        <li>Update request status</li>
        <li>Edit request details when necessary</li>
        <li>Manage income access requests</li>
      </ul>

      <p>All activity within the system is tracked to maintain clear records of each request&apos;s progress.</p>

      <h2>Getting Started</h2>
      <p>To begin using the system:</p>
      <ol>
        <li>Click the Login button if you already have an approved account.</li>
        <li>If you do not yet have access, click Request Access</li>
        <li>Select the appropriate role and submit your access request.</li>
        <li>A system administrator will review and approve your request</li>
        <li>Once approve, you may log in and begin submitting or managing digitisation requests. </li>
      </ol>

<p>Please note: Access must be approved before full functionality is available.</p>

<h2>Request Lifecycle Overview</h2>
<ol>
  <li>A requester submits a digitisation request.</li>
  <li>An administrator reviews the submission.</li>
  <li>The request status is updated as it moves through the digitisation process.</li>
  <li>The requester can monitor progress directly within the portal.</li>
  <li>Once completed, the request is marked as fulfilled.</li>
</ol>

<h2>Need Assistance?</h2>
If you experience technical issues, have questions about your request, or require help accessing the system, please contact:

[Name]
Email: [email]
Phone: [phone]

<p>For issues related to account access or role approval, please reference your full name and the email used during registration.</p>
    </main>
  );
}
