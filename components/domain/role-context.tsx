"use client";

import { createContext, useContext } from "react";
import { Role } from "@/lib/roles";

const RoleContext = createContext<Role | null>(null);

export function RoleProvider({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  return (
    <RoleContext.Provider value={role}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): Role {
  const role = useContext(RoleContext);

  if (!role) {
    throw new Error("useRole must be used inside RoleProvider");
  }

  return role;
}