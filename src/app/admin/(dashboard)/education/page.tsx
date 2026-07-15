import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteEducation } from "./actions";

export default async function EducationPage({
  searchParams,
}: {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    deleted?: string;
    error?: string;
  }>;
}) {
  const { created, updated, deleted, error } = await searchParams;

  const education = await prisma.education.findMany({
    orderBy: [{ order: "asc" }, { startDate: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Education</h1>
          <p className="mt-2 text-zinc-400">
            Manage your education and qualifications.
          </p>
        </div>

        <Link
          href="/admin/education/new"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200"
        >
          Add education
        </Link>
      </div>

      {created === "true" && <Message>Education created successfully.</Message>}

      {updated === "true" && <Message>Education updated successfully.</Message>}

      {deleted === "true" && <Message>Education deleted successfully.</Message>}

      {error && (
        <div className="mt-6 rounded-lg border border-red-800 bg-red-950 p-4 text-red-300">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="mt-8 space-y-4">
        {education.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
            No education added yet.
          </div>
        ) : (
          education.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <div>
                <h2 className="font-semibold">{item.degree}</h2>

                <p className="mt-1 text-sm text-zinc-400">
                  {item.institution}
                  {item.field && ` • ${item.field}`}
                </p>

                <p className="mt-2 text-xs text-zinc-500">
                  {item.startDate
                    ? item.startDate.toLocaleDateString()
                    : "No start date"}
                  {" — "}
                  {item.endDate ? item.endDate.toLocaleDateString() : "Present"}
                  {" • "}
                  {item.isVisible ? "Visible" : "Hidden"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/education/${item.id}/edit`}
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
                >
                  Edit
                </Link>

                <form action={deleteEducation.bind(null, item.id)}>
                  <button
                    type="submit"
                    className="rounded-lg border border-red-900 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Message({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-lg border border-green-800 bg-green-950 p-4 text-green-300">
      {children}
    </div>
  );
}
