import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteProjectButton } from "./DeleteProjectButton";
export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-2 text-zinc-400">Manage your portfolio projects.</p>
        </div>

        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200"
        >
          Add project
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {projects.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
            No projects yet.
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <div>
                <h2 className="font-semibold">{project.title}</h2>

                <p className="mt-1 text-sm text-zinc-400">
                  {project.technologies.join(" • ")}
                </p>

                <div className="mt-2 flex gap-2 text-xs">
                  {project.featured && (
                    <span className="rounded bg-zinc-700 px-2 py-1">
                      Featured
                    </span>
                  )}

                  <span className="rounded bg-zinc-700 px-2 py-1">
                    {project.isVisible ? "Visible" : "Hidden"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
                >
                  Edit
                </Link>

                <DeleteProjectButton projectId={project.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
