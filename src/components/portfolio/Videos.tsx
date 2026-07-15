type Video = {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  thumbnailUrl: string | null;
  publishedAt: Date | null;
};

type VideosProps = {
  videos: Video[];
};

export default function Videos({ videos }: VideosProps) {
  if (videos.length === 0) {
    return null;
  }

  return (
    <section
      id="videos"
      className="border-b border-white/10 px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
            Videos
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Watch and learn.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Videos where I share ideas, tutorials, and practical knowledge.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <article
              key={video.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-white/20"
            >
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                {video.thumbnailUrl ? (
                  <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-zinc-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/40">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/60 text-xl text-white backdrop-blur">
                        ▶
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex aspect-video items-center justify-center border-b border-white/10 bg-gradient-to-br from-red-500/20 via-zinc-900 to-violet-500/10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xl">
                      ▶
                    </div>
                  </div>
                )}
              </a>

              <div className="p-7">
                {video.publishedAt && (
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                    {formatDate(video.publishedAt)}
                  </p>
                )}

                <h3 className="mt-3 text-xl font-semibold text-white">
                  {video.title}
                </h3>

                {video.description && (
                  <p className="mt-4 leading-7 text-zinc-400">
                    {video.description}
                  </p>
                )}

                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block text-sm font-medium text-violet-300 transition hover:text-violet-200"
                >
                  Watch video ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
