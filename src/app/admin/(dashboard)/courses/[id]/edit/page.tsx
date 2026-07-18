import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateCourse } from "../../actions";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditCoursePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;

  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/courses"
        className="text-sm text-zinc-400 hover:text-white"
      >
        ← Back to courses
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Edit Course</h1>

      {error && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <form
        action={updateCourse.bind(null, course.id)}
        className="mt-8 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <Field
          label="Title"
          name="title"
          defaultValue={course.title}
          required
        />

        <Field label="Slug" name="slug" defaultValue={course.slug} required />

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
            defaultValue={course.description}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="mb-2 block text-sm text-zinc-300">
            Course Image
          </label>

          {course.imageUrl && (
            <Image
              src={course.imageUrl}
              alt={course.title}
              width={400}
              height={225}
              className="mb-4 rounded-lg border border-zinc-700 object-cover"
            />
          )}

          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3"
          />
        </div>

        <Field
          label="Course URL"
          name="courseUrl"
          type="url"
          defaultValue={course.courseUrl}
        />

        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input
            name="isPublished"
            type="checkbox"
            defaultChecked={course.isPublished}
            className="h-4 w-4"
          />
          Published
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
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-500"
      />
    </div>
  );
}
