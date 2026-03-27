"use client";

import { Shield, GraduationCap, User } from "lucide-react";
import { Badge } from "@/components/ui/data-display/badge";
import { cn } from "@/lib/utils";

type Role = "admin" | "teacher" | "student";

interface RoleBadgeProps {
  role: Role;
  className?: string;
  showIcon?: boolean;
}

const roleConfig: Record<
  Role,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    tokenClass: string;
  }
> = {
  admin: {
    label: "Admin",
    icon: Shield,
    tokenClass:
      "bg-[var(--role-admin-bg)] text-[var(--role-admin-text)] border-[var(--role-admin-border)]",
  },
  teacher: {
    label: "Teacher",
    icon: GraduationCap,
    tokenClass:
      "bg-[var(--role-teacher-bg)] text-[var(--role-teacher-text)] border-[var(--role-teacher-border)]",
  },
  student: {
    label: "Student",
    icon: User,
    tokenClass:
      "bg-[var(--role-student-bg)] text-[var(--role-student-text)] border-[var(--role-student-border)]",
  },
};

export function RoleBadge({
  role,
  className,
  showIcon = true,
}: RoleBadgeProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <Badge
      className={cn(
        "inline-flex items-center gap-1.5",
        config.tokenClass,
        className
      )}
    >
      {showIcon && <Icon className="h-3.5 w-3.5" />}
      {config.label}
    </Badge>
  );
}