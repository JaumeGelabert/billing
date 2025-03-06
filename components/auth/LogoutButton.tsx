"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth/logout";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  const handleClick = async () => {
    await logout();
    redirect("/");
  };

  return <Button onClick={handleClick}>Logout</Button>;
}
