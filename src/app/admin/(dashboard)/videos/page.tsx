import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteVideo } from "./actions";

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    deleted?: string;
    error?: string;
  }>;
}) {
  const { created, updated, deleted, error } = await searchParams;

  const videos = await prisma.video.findMany({
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Videos</h1>
          <p className="mt-2 text-zinc-400">Manage your YouTube videos.</p>
        </div>

        <Link
          href="/admin/videos/new"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200"
        >
          Add video
        </Link>
      </div>

      {created === "true" && <Message>Video created successfully.</Message>}

      {updated === "true" && <Message>Video updated successfully.</Message>}

      {deleted === "true" && <Message>Video deleted successfully.</Message>}

      {error && (
        <div className="mt-6 rounded-lg border border-red-800 bg-red-950 p-4 text-red-300">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="mt-8 space-y-4">
        {videos.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
            No videos yet.
          </div>
        ) : (
          videos.map((video) => (
            <div
              key={video.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <div>
                <h2 className="font-semibold">{video.title}</h2>

                <p className="mt-1 max-w-2xl truncate text-sm text-zinc-400">
                  {video.youtubeUrl}
                </p>

                <p className="mt-2 text-xs text-zinc-500">
                  {video.publishedAt
                    ? video.publishedAt.toLocaleDateString()
                    : "No publication date"}
                  {" • "}
                  {video.isVisible ? "Visible" : "Hidden"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/videos/${video.id}/edit`}
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
                >
                  Edit
                </Link>

                <form action={deleteVideo.bind(null, video.id)}>
                  <button
                    type="submit"
                    className="rounded-lg border border-red-900 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Message({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-lg border border-green-800 bg-green-950 p-4 text-green-300">
      {children}
    </div>
  );
}
