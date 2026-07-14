import Link from "next/link";
import { createSkill } from "../actions";

export default function NewSkillPage() {
  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/skills"
        className="text-sm text-zinc-400 hover:text-white"
      >
        ← Back to skills
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Add Skill</h1>

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
        <Field label="Icon" name="icon" placeholder="Optional for now" />
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
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
      />
    </div>
  );
}
