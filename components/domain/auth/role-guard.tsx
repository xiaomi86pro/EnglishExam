"use client";

import {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  Children,
} from "react";
import { Role, hasMinRole } from "@/lib/roles";

interface RoleGuardProps {
  currentRole: Role;
  requiredRole: Role;
  children: ReactNode;
  fallback?: ReactNode;
  mode?: "hide" | "disable";
  disabledReason?: string;
}

/**
 * RoleGuard
 *
 * mode="hide"
 *   → Không đủ quyền thì không render
 *
 * mode="disable"
 *   → Không đủ quyền thì render children nhưng disabled
 */
export function RoleGuard({
  currentRole,
  requiredRole,
  children,
  fallback = null,
  mode = "hide",
  disabledReason,
}: RoleGuardProps) {
  const allowed = hasMinRole(currentRole, requiredRole);

  if (allowed) {
    return <>{children}</>;
  }

  if (mode === "hide") {
    return <>{fallback}</>;
  }

  // mode === "disable"
  return (
    <>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;

        const element = child as ReactElement<any>;

        return cloneElement(element, {
          disabled: true,
          title: disabledReason ?? element.props.title,
          "aria-disabled": true,
        });
      })}
    </>
  );
}