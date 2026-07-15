type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  field: string | null;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
};

type EducationProps = {
  education: EducationItem[];
};

export default function Education({ education }: EducationProps) {
  if (education.length === 0) {
    return null;
  }

  return (
    <section
      id="education"
      className="border-b border-white/10 px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
            Education
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Learning and growth.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            My academic background and the foundations behind my work.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {education.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8"
            >
              <p className="text-sm font-medium text-violet-300">
                {formatEducationPeriod(item.startDate, item.endDate)}
              </p>

              <h3 className="mt-5 text-2xl font-semibold text-white">
                {item.degree}
              </h3>

              {item.field && <p className="mt-2 text-zinc-300">{item.field}</p>}

              <p className="mt-4 font-medium text-zinc-400">
                {item.institution}
              </p>

              {item.description && (
                <p className="mt-5 whitespace-pre-line leading-7 text-zinc-500">
                  {item.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatEducationPeriod(startDate: Date | null, endDate: Date | null) {
  if (!startDate && !endDate) {
    return "Education";
  }

  const start = startDate ? formatDate(startDate) : null;
  const end = endDate ? formatDate(endDate) : "Present";

  if (!start) {
    return end;
  }

  return `${start} — ${end}`;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}
