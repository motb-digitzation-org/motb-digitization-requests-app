"use client";
import { getGlobalUser, UserInterface } from "@/app/database/utils";
import { useEffect, useState } from "react";

export default function RequestsPage() {
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    function getUserLocal() {
      setUser(getGlobalUser());
    }
    getUserLocal();
  }, []);

  if (user) {
    return <p>{user.role}</p>;
  } else {
    // TODO: make look pretty
    return (
      <div>
        <p>You&apos;re not logged in</p>
      </div>
    );
  }
}
