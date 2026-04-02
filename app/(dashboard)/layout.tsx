import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/domain/auth/logout-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?error=session-expired");
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6 flex justify-end">
        <LogoutButton />
      </div>

      {children}
    </div>
  );
}