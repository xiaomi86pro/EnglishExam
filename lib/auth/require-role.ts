import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type AppRole = "admin" | "teacher" | "student";

type RequireRoleResult = {
  userId: string;
  role: AppRole;
  name: string;
};

export async function requireRole(
  expectedRole?: AppRole
): Promise<RequireRoleResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?error=session-expired");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, name")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    await supabase.auth.signOut();
    redirect("/login?error=profile-not-found");
  }

  const role = profile.role as AppRole;

  if (expectedRole && role !== expectedRole) {
    redirect("/login?error=unauthorized");
  }

  return {
    userId: user.id,
    role,
    name: profile.name,
  };
}