import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-xl space-y-6 rounded-2xl border p-8 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Exam System</h1>
          <p className="text-sm text-muted-foreground">
            Development homepage để điều hướng nhanh giữa auth và dashboard.
          </p>
        </div>

        <div className="grid gap-3">
          <Link
            href="/login"
            className="rounded-xl border px-4 py-3 hover:bg-muted"
          >
            Go to Login
          </Link>

          <Link
            href="/teacher/questions/create"
            className="rounded-xl border px-4 py-3 hover:bg-muted"
          >
            Test Create Question Flow
          </Link>
        </div>
      </div>
    </main>
  );
}