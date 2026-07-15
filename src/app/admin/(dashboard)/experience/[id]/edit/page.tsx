import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateExperience } from "../../actions";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const experience = await prisma.experience.findUnique({
    where: { id },
  });

  if (!experience) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/experience"
        className="text-sm text-zinc-400 hover:text-white"
      >
        ← Back to experience
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Edit Experience</h1>

      <form
        action={updateExperience.bind(null, experience.id)}
        className="mt-8 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <Field
          label="Company"
          name="company"
          defaultValue={experience.company}
          required
        />

        <Field
          label="Position"
          name="position"
          defaultValue={experience.position}
          required
        />

        <Field
          label="Location"
          name="location"
          defaultValue={experience.location}
        />

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
            defaultValue={experience.description ?? ""}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
          />
        </div>

        <Field
          label="Start date"
          name="startDate"
          type="date"
          defaultValue={formatDate(experience.startDate)}
          required
        />

        <Field
          label="End date"
          name="endDate"
          type="date"
          defaultValue={
            experience.endDate ? formatDate(experience.endDate) : ""
          }
        />

        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input
            name="isCurrent"
            type="checkbox"
            defaultChecked={experience.isCurrent}
            className="h-4 w-4"
          />
          I currently work here
        </label>

        <Field
          label="Display order"
          name="order"
          type="number"
          defaultValue={experience.order.toString()}
        />

        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input
            name="isVisible"
            type="checkbox"
            defaultChecked={experience.isVisible}
            className="h-4 w-4"
          />
          Visible on portfolio
        </label>

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

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
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
