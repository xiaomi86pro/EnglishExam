import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("HOME USER ID", user?.id);

  if (!user) {
    console.log("NO USER -> LOGIN");
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, name")
    .eq("id", user.id)
    .single();

  console.log("PROFILE", profile);
  console.log("PROFILE ERROR", error);

  if (!profile) {
    console.log("NO PROFILE -> LOGIN");
    redirect("/login");
  }

  switch (profile.role) {
  case "admin":
    redirect("/admin");
  case "teacher":
    redirect("/teacher/questions/create");
  case "student":
    redirect("/student");
  default:
    redirect("/login");
}
}