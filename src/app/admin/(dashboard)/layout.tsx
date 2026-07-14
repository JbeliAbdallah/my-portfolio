import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { logout } from "./logout/actions";

const navigation = [
  ["Dashboard", "/admin"],
  ["Profile", "/admin/profile"],
  ["Projects", "/admin/projects"],
  ["Skills", "/admin/skills"],
  ["Services", "/admin/services"],
  ["Experience", "/admin/experience"],
  ["Education", "/admin/education"],
  ["Courses", "/admin/courses"],
  ["Videos", "/admin/videos"],
  ["Social Links", "/admin/social-links"],
  ["Messages", "/admin/messages"],
  ["Settings", "/admin/settings"],
];

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-zinc-800 bg-zinc-900 p-6">
        <Link href="/admin" className="text-xl font-bold">
          Portfolio Admin
        </Link>

        <nav className="mt-8 space-y-1">
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        <form action={logout} className="absolute bottom-6 left-6 right-6">
          <button
            type="submit"
            className="w-full rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
          >
            Log out
          </button>
        </form>
      </aside>

      <main className="ml-64 min-h-screen p-8">{children}</main>
    </div>
  );
}
