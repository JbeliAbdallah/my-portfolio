import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProject } from "../../actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProject.bind(null, project.id);

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/projects"
        className="text-sm text-zinc-400 hover:text-white"
      >
        ← Back to projects
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Edit Project</h1>

      <form
        action={updateProjectWithId}
        className="mt-8 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <Field
          label="Title"
          name="title"
          defaultValue={project.title}
          required
        />
        <Field label="Slug" name="slug" defaultValue={project.slug} required />

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm text-zinc-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            required
            defaultValue={project.description}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
          />
        </div>

        <Field
          label="Image URL"
          name="imageUrl"
          type="url"
          defaultValue={project.imageUrl}
        />
        <Field
          label="Live URL"
          name="liveUrl"
          type="url"
          defaultValue={project.liveUrl}
        />
        <Field
          label="GitHub URL"
          name="githubUrl"
          type="url"
          defaultValue={project.githubUrl}
        />

        <Field
          label="Technologies (comma separated)"
          name="technologies"
          defaultValue={project.technologies.join(", ")}
        />

        <Checkbox
          label="Featured project"
          name="featured"
          defaultChecked={project.featured}
        />

        <Checkbox
          label="Visible on portfolio"
          name="isVisible"
          defaultChecked={project.isVisible}
        />

        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | null;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-zinc-300">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
      />
    </div>
  );
}

function Checkbox({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-center gap-3 text-sm text-zinc-300">
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-4 w-4"
      />
      {label}
    </label>
  );
}
