import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateSkill } from "../../actions";
import { skillIconOptions } from "@/lib/skill-icons";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditSkillPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;

  const skill = await prisma.skill.findUnique({
    where: { id },
  });

  if (!skill) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/skills"
        className="text-sm text-zinc-400 hover:text-white"
      >
        ← Back to skills
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Edit Skill</h1>

      {error && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <form
        action={updateSkill.bind(null, skill.id)}
        className="mt-8 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <Field label="Name" name="name" defaultValue={skill.name} required />

        <Field label="Category" name="category" defaultValue={skill.category} />

        <Field
          label="Level (%)"
          name="level"
          type="number"
          min="0"
          max="100"
          defaultValue={skill.level?.toString()}
        />

        <div>
          <label htmlFor="icon" className="mb-2 block text-sm text-zinc-300">
            Icon
          </label>

          <select
            id="icon"
            name="icon"
            defaultValue={skill.icon ?? ""}
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
          defaultValue={skill.order.toString()}
        />

        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input
            name="isVisible"
            type="checkbox"
            defaultChecked={skill.isVisible}
            className="h-4 w-4"
          />
          Visible on portfolio
        </label>

        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
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
  min,
  max,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | null;
  required?: boolean;
  min?: string;
  max?: string;
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
        min={min}
        max={max}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-500"
      />
    </div>
  );
}
