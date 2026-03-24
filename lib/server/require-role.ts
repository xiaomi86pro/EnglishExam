// lib/server/require-role.ts

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Role, hasMinRole } from "@/lib/roles";

/**
 * Enforce minimum role at server component level
 * Redirect if insufficient permission
 */
export async function requireMinRole(requiredRole: Role) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    redirect("/login");
  }

  if (!hasMinRole(profile.role, requiredRole)) {
    redirect("/dashboard"); // fallback page
  }

  return profile;
}