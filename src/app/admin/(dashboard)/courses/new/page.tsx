import Link from "next/link";
import { createCourse } from "../actions";

type Props = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewCoursePage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/courses"
        className="text-sm text-zinc-400 hover:text-white"
      >
        ← Back to courses
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Add Course</h1>

      {error && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <form
        action={createCourse}
        className="mt-8 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <Field label="Title" name="title" required />

        <Field label="Slug" name="slug" placeholder="my-course" required />

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
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <Field label="Image URL" name="imageUrl" type="url" />

        <Field label="Course URL" name="courseUrl" type="url" />

        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input name="isPublished" type="checkbox" className="h-4 w-4" />
          Published
        </label>

        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
        >
          Create course
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-500"
      />
    </div>
  );
}
