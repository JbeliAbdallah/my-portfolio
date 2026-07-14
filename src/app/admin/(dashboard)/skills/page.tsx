import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSkill } from "./actions";

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="mt-2 text-zinc-400">
            Manage your skills and technologies.
          </p>
        </div>

        <Link
          href="/admin/skills/new"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200"
        >
          Add skill
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {skills.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
            No skills yet.
          </div>
        ) : (
          skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <div>
                <h2 className="font-semibold">{skill.name}</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  {skill.category || "No category"}
                  {skill.level !== null && ` • ${skill.level}%`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/skills/${skill.id}/edit`}
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
                >
                  Edit
                </Link>

                <form action={deleteSkill.bind(null, skill.id)}>
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
