import { auth } from "@/auth";
import { type Session } from "@/auth";

import type { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata | null> {
  const sessionData: Session | null = await auth.api.getSession({
    headers: await headers()
  });
  if (!sessionData) return null;

  return {
    title: `${sessionData.user.name} | Invoices `
  };
}

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <span>{children}</span>;
}
