import Link from "next/link";
import { createSkill } from "../actions";
import { skillIconOptions } from "@/lib/skill-icons";

type Props = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewSkillPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/skills"
        className="text-sm text-zinc-400 hover:text-white"
      >
        ← Back to skills
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Add Skill</h1>

      {error && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <form
        action={createSkill}
        className="mt-8 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <Field label="Name" name="name" required />

        <Field
          label="Category"
          name="category"
          placeholder="Frontend, Backend, Tools..."
        />

        <Field label="Level (%)" name="level" type="number" min="0" max="100" />

        <div>
          <label htmlFor="icon" className="mb-2 block text-sm text-zinc-300">
            Icon
          </label>

          <select
            id="icon"
            name="icon"
            defaultValue=""
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-500"
          >
            <option value="">Select an icon</option>

            {skillIconOptions.map((icon) => (
              <option key={icon.value} value={icon.value}>
                {icon.label}
              </option>
            ))}
          </select>
        </div>
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
          className="rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
        >
          Create skill
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
  placeholder,
  min,
  max,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: string;
  max?: string;
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
        placeholder={placeholder}
        min={min}
        max={max}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-500"
      />
    </div>
  );
}
