import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateSkill } from "../../actions";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
        <Field label="Icon" name="icon" defaultValue={skill.icon} />
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
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
      />
    </div>
  );
}
