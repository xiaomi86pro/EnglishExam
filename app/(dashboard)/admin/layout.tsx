"use client";

import { useRole } from "@/components/domain/role-context";
import { hasMinRole } from "@/lib/roles";
import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useRole();

  if (!hasMinRole(role, "admin")) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}