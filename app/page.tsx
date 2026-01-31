"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <h1>Welcome to the Digitization Request App</h1>
      <p>What this application is for and what it does...</p>

      <Button
        onClick={() => {
          router.push("/auth/request-access");
        }}
      >
        Request Access
      </Button>

      <Button
        onClick={() => {
          router.push("auth/login");
        }}
      >
        Login
      </Button>
    </main>
  );
}
