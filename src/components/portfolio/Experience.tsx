type ExperienceItem = {
  id: string;
  company: string;
  position: string;
  description: string | null;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
};

type ExperienceProps = {
  experiences: ExperienceItem[];
};

export default function Experience({ experiences }: ExperienceProps) {
  if (experiences.length === 0) {
    return null;
  }

  return (
    <section
      id="experience"
      className="border-b border-white/10 px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
            Experience
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            My professional journey.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            The roles, teams, and experiences that have shaped my work.
          </p>
        </div>

        <div className="mt-16">
          {experiences.map((experience, index) => (
            <article
              key={experience.id}
              className="relative grid gap-6 border-l border-white/10 pb-12 pl-8 last:pb-0 md:grid-cols-[220px_1fr] md:gap-12"
            >
              <div className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-violet-400 ring-4 ring-zinc-950" />

              <div>
                <p className="text-sm font-medium text-zinc-400">
                  {formatDate(experience.startDate)}
                  {" — "}
                  {experience.isCurrent
                    ? "Present"
                    : experience.endDate
                      ? formatDate(experience.endDate)
                      : "Present"}
                </p>

                {experience.location && (
                  <p className="mt-2 text-sm text-zinc-600">
                    {experience.location}
                  </p>
                )}

                <p className="mt-2 text-xs text-zinc-700">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">
                <h3 className="text-2xl font-semibold text-white">
                  {experience.position}
                </h3>

                <p className="mt-2 font-medium text-violet-300">
                  {experience.company}
                </p>

                {experience.description && (
                  <p className="mt-5 whitespace-pre-line leading-7 text-zinc-400">
                    {experience.description}
                  </p>
                )}
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
    year: "numeric",
  }).format(date);
}
