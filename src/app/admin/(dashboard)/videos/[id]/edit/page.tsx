import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateVideo } from "../../actions";

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const video = await prisma.video.findUnique({
    where: { id },
  });

  if (!video) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/videos"
        className="text-sm text-zinc-400 hover:text-white"
      >
        ← Back to videos
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Edit Video</h1>

      <form
        action={updateVideo.bind(null, video.id)}
        className="mt-8 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <Field label="Title" name="title" defaultValue={video.title} required />

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
            defaultValue={video.description ?? ""}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
          />
        </div>

        <Field
          label="YouTube URL"
          name="youtubeUrl"
          type="url"
          defaultValue={video.youtubeUrl}
          required
        />

        <Field
          label="Thumbnail URL"
          name="thumbnailUrl"
          type="url"
          defaultValue={video.thumbnailUrl}
        />

        <Field
          label="Publication date"
          name="publishedAt"
          type="date"
          defaultValue={video.publishedAt ? formatDate(video.publishedAt) : ""}
        />

        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input
            name="isVisible"
            type="checkbox"
            defaultChecked={video.isVisible}
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
