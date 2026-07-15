import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteExperience } from "./actions";

export default async function ExperiencePage({
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

  const experiences = await prisma.experience.findMany({
    orderBy: [{ order: "asc" }, { startDate: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experience</h1>
          <p className="mt-2 text-zinc-400">
            Manage your professional experience.
          </p>
        </div>

        <Link
          href="/admin/experience/new"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200"
        >
          Add experience
        </Link>
      </div>

      {created === "true" && (
        <Message>Experience created successfully.</Message>
      )}

      {updated === "true" && (
        <Message>Experience updated successfully.</Message>
      )}

      {deleted === "true" && (
        <Message>Experience deleted successfully.</Message>
      )}

      {error && (
        <div className="mt-6 rounded-lg border border-red-800 bg-red-950 p-4 text-red-300">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="mt-8 space-y-4">
        {experiences.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
            No experience added yet.
          </div>
        ) : (
          experiences.map((experience) => (
            <div
              key={experience.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <div>
                <h2 className="font-semibold">{experience.position}</h2>

                <p className="mt-1 text-sm text-zinc-400">
                  {experience.company}
                  {experience.location && ` • ${experience.location}`}
                </p>

                <p className="mt-2 text-xs text-zinc-500">
                  {experience.startDate.toLocaleDateString()} —{" "}
                  {experience.isCurrent
                    ? "Present"
                    : experience.endDate?.toLocaleDateString() || "No end date"}
                  {" • "}
                  {experience.isVisible ? "Visible" : "Hidden"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/experience/${experience.id}/edit`}
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
                >
                  Edit
                </Link>

                <form action={deleteExperience.bind(null, experience.id)}>
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
