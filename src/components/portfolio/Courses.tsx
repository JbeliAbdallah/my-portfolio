type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  courseUrl: string | null;
};

type CoursesProps = {
  courses: Course[];
};

export default function Courses({ courses }: CoursesProps) {
  if (courses.length === 0) {
    return null;
  }

  return (
    <section
      id="courses"
      className="border-b border-white/10 px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
            Courses
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Learn with me.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Courses and learning resources I&apos;ve created to share practical
            knowledge and experience.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-white/20"
            >
              {course.imageUrl ? (
                <div className="aspect-video overflow-hidden border-b border-white/10 bg-zinc-900">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center border-b border-white/10 bg-gradient-to-br from-violet-500/20 via-zinc-900 to-blue-500/10">
                  <span className="text-5xl font-bold text-white/10">
                    {course.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl font-semibold text-white">
                  {course.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-zinc-400">
                  {course.description}
                </p>

                {course.courseUrl && (
                  <a
                    href={course.courseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex w-fit rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
                  >
                    View course ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
