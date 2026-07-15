import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateEducation } from "../../actions";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const education = await prisma.education.findUnique({
    where: { id },
  });

  if (!education) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/education"
        className="text-sm text-zinc-400 hover:text-white"
      >
        ← Back to education
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Edit Education</h1>

      <form
        action={updateEducation.bind(null, education.id)}
        className="mt-8 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <Field
          label="Institution"
          name="institution"
          defaultValue={education.institution}
          required
        />

        <Field
          label="Degree"
          name="degree"
          defaultValue={education.degree}
          required
        />

        <Field
          label="Field of study"
          name="field"
          defaultValue={education.field}
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
            defaultValue={education.description ?? ""}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
          />
        </div>

        <Field
          label="Start date"
          name="startDate"
          type="date"
          defaultValue={
            education.startDate ? formatDate(education.startDate) : ""
          }
        />

        <Field
          label="End date"
          name="endDate"
          type="date"
          defaultValue={education.endDate ? formatDate(education.endDate) : ""}
        />

        <Field
          label="Display order"
          name="order"
          type="number"
          defaultValue={education.order.toString()}
        />

        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input
            name="isVisible"
            type="checkbox"
            defaultChecked={education.isVisible}
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
