import { serviceIcons } from "@/lib/service-icons";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string | null;
};

type ServicesProps = {
  services: Service[];
};

export default function Services({ services }: ServicesProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <section
      id="services"
      className="border-b border-white/10 px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
            Services
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            What I can do for you.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            I build thoughtful digital solutions focused on performance,
            usability, and real-world results.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl">
                  {(() => {
                    const Icon = service.icon
                      ? serviceIcons[service.icon]
                      : null;

                    return Icon ? <Icon /> : "✦";
                  })()}
                </div>

                <span className="text-sm text-zinc-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-8 text-xl font-semibold text-white">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
