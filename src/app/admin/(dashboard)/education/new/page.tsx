import Link from "next/link";
import { createEducation } from "../actions";

export default function NewEducationPage() {
  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/education"
        className="text-sm text-zinc-400 hover:text-white"
      >
        ← Back to education
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Add Education</h1>

      <form
        action={createEducation}
        className="mt-8 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <Field label="Institution" name="institution" required />
        <Field label="Degree" name="degree" required />
        <Field label="Field of study" name="field" />

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
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
          />
        </div>

        <Field label="Start date" name="startDate" type="date" />
        <Field label="End date" name="endDate" type="date" />

        <Field
          label="Display order"
          name="order"
          type="number"
          defaultValue="0"
        />

        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input
            name="isVisible"
            type="checkbox"
            defaultChecked
            className="h-4 w-4"
          />
          Visible on portfolio
        </label>

        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200"
        >
          Create education
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
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
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
      />
    </div>
  );
}
