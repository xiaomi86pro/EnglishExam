// lib/roles.ts

export type Role = "admin" | "teacher" | "student";

/**
 * Numeric hierarchy
 * student < teacher < admin
 */
export const ROLE_RANK: Record<Role, number> = {
  student: 1,
  teacher: 2,
  admin: 3,
};

/**
 * Check if current role satisfies minimum required role
 */
export function hasMinRole(
  current: Role,
  required: Role
): boolean {
  return ROLE_RANK[current] >= ROLE_RANK[required];
}

/**
 * Strict equality (useful for some UI cases)
 */
export function isRole(
  current: Role,
  role: Role
): boolean {
  return current === role;
}