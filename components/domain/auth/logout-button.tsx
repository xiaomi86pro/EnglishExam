import { logout } from "@/lib/auth/logout";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded border px-4 py-2 text-sm"
      >
        Logout
      </button>
    </form>
  );
}