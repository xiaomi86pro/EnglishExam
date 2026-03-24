"use client";

import { useRole } from "@/components/domain/role-context";
import { hasMinRole } from "@/lib/roles";
import { redirect } from "next/navigation";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useRole();

  if (!hasMinRole(role, "teacher")) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}