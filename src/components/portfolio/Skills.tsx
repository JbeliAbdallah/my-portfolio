import { getSkillIcon } from "@/lib/skill-icons";

type Skill = {
  id: string;
  name: string;
  category: string | null;
  level: number | null;
  icon: string | null;
};

type SkillsProps = {
  skills: Skill[];
};

export default function Skills({ skills }: SkillsProps) {
  if (skills.length === 0) {
    return null;
  }

  const groupedSkills = skills.reduce<Record<string, Skill[]>>(
    (groups, skill) => {
      const category = skill.category || "Other";

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(skill);

      return groups;
    },
    {},
  );

  return (
    <section
      id="skills"
      className="border-b border-white/10 px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
            Skills
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Technologies I work with.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            A growing toolkit of technologies and skills I use to build modern
            digital products.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
                {category}
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categorySkills.map((skill) => {
                  const Icon = getSkillIcon(skill.icon);

                  return (
                    <article
                      key={skill.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Icon
                            size={22}
                            className="text-violet-400 flex-shrink-0"
                          />

                          <h4 className="font-medium text-white">
                            {skill.name}
                          </h4>
                        </div>

                        {skill.level !== null && (
                          <span className="text-sm text-zinc-500">
                            {skill.level}%
                          </span>
                        )}
                      </div>

                      {skill.level !== null && (
                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-violet-400"
                            style={{
                              width: `${Math.min(Math.max(skill.level, 0), 100)}%`,
                            }}
                          />
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
