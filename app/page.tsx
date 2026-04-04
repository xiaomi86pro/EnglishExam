import Link from "next/link";

import { requireRole } from "@/lib/auth/require-role";

type AppRole = "admin" | "teacher" | "student";

type HomeLink = {
  href: string;
  title: string;
  description: string;
  pathLabel: string;
};

const ROLE_LINKS: Record<AppRole, HomeLink[]> = {
  admin: [
    {
      href: "/admin",
      title: "Trang quan tri",
      description: "Mo khu vuc dieu hanh danh cho admin.",
      pathLabel: "(dashboard)/admin/page.tsx",
    },
  ],
  student: [
    {
      href: "/student",
      title: "Trang hoc sinh",
      description: "Mo giao dien hoc tap danh cho student.",
      pathLabel: "(dashboard)/student/page.tsx",
    },
  ],
  teacher: [
    {
      href: "/teacher",
      title: "Teacher Dashboard",
      description: "Mo trang tong quan danh cho giao vien.",
      pathLabel: "(dashboard)/teacher/page.tsx",
    },
    {
      href: "/teacher/questions",
      title: "Danh sach cau hoi",
      description: "Mo trang quan ly va tim kiem question.",
      pathLabel: "(dashboard)/teacher/questions/page.tsx",
    },
  ],
};

const ROLE_STYLES: Record<
  AppRole,
  {
    badgeClassName: string;
    panelClassName: string;
    accentClassName: string;
  }
> = {
  admin: {
    badgeClassName:
      "border-[color:var(--role-admin-border)] bg-[color:var(--role-admin-bg)] text-[color:var(--role-admin-text)]",
    panelClassName:
      "border-[color:var(--role-admin-border)] bg-[color:var(--role-admin-bg)]/70",
    accentClassName: "bg-[color:var(--role-admin-text)]",
  },
  teacher: {
    badgeClassName:
      "border-[color:var(--role-teacher-border)] bg-[color:var(--role-teacher-bg)] text-[color:var(--role-teacher-text)]",
    panelClassName:
      "border-[color:var(--role-teacher-border)] bg-[color:var(--role-teacher-bg)]/70",
    accentClassName: "bg-[color:var(--role-teacher-text)]",
  },
  student: {
    badgeClassName:
      "border-[color:var(--role-student-border)] bg-[color:var(--role-student-bg)] text-[color:var(--role-student-text)]",
    panelClassName:
      "border-[color:var(--role-student-border)] bg-[color:var(--role-student-bg)]/70",
    accentClassName: "bg-[color:var(--role-student-text)]",
  },
};

export default async function HomePage() {
  const { role, name } = await requireRole();
  const links = ROLE_LINKS[role];
  const roleStyles = ROLE_STYLES[role];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#e2e8f0_0%,_#f8fafc_45%,_#cbd5e1_100%)] px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white/95 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-5">
            <div className="inline-flex rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
              Home
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Xin chao {role} {name}
              </h1>

              <p className="max-w-2xl text-base text-slate-600">
                Day la trang chu sau dang nhap. Chon dung khu vuc lam viec theo role hien tai.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block w-[280px] rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-3 text-left text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <p className="pr-2 text-sm font-semibold leading-5 text-white">
                        {link.title}
                      </p>
                      <span className="shrink-0 rounded-full bg-slate-700 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-100">
                        Open
                      </span>
                    </div>

                    <p className="rounded-lg bg-slate-800 px-3 py-2 font-mono text-[11px] leading-4 text-slate-200">
                      {link.pathLabel}
                    </p>

                    <p className="text-xs leading-5 text-slate-300">
                      {link.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <aside
            className={`rounded-3xl border p-6 shadow-inner ${roleStyles.panelClassName}`}
          >
            <div className="space-y-4">
              <div
                className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold uppercase tracking-[0.14em] ${roleStyles.badgeClassName}`}
              >
                Role: {role}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Nguoi dung</p>
                <p className="text-2xl font-semibold text-slate-900">{name}</p>
              </div>

              <div className="rounded-2xl border border-slate-300 bg-white/80 p-4">
                <p className="text-sm font-medium text-slate-700">
                  So trang kha dung
                </p>
                <p className="mt-2 text-4xl font-semibold text-slate-900">
                  {links.length}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-700">
                  Trang duoc mo cho role nay
                </p>

                {links.map((link) => (
                  <div
                    key={link.href}
                    className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white/80 px-4 py-3"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${roleStyles.accentClassName}`}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {link.title}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {link.href}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
