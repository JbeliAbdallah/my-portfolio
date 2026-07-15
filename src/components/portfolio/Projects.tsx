type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  technologies: string[];
  featured: boolean;
};

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="border-b border-white/10 px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
            Projects
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Selected work.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            A selection of projects I&apos;ve built, designed, and worked on.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:border-white/20"
            >
              {project.imageUrl ? (
                <div className="aspect-[16/10] overflow-hidden border-b border-white/10 bg-zinc-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center border-b border-white/10 bg-gradient-to-br from-violet-500/20 via-zinc-900 to-blue-500/10">
                  <span className="text-6xl font-bold text-white/10">
                    {project.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              <div className="p-7 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-white">
                    {project.title}
                  </h3>

                  {project.featured && (
                    <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs font-medium text-violet-300">
                      Featured
                    </span>
                  )}
                </div>

                <p className="mt-4 leading-7 text-zinc-400">
                  {project.description}
                </p>

                {project.technologies.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                )}

                {(project.liveUrl || project.githubUrl) && (
                  <div className="mt-8 flex flex-wrap gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
                      >
                        View live ↗
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                      >
                        View code ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
