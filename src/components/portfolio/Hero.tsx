import { getSocialIcon } from "@/lib/social-icons";

type SocialLink = {
  id: string;
  platform: string;
  url: string;
};

type HeroProps = {
  fullName: string;
  headline: string | null;
  bio: string | null;
  location: string | null;
  cvUrl: string | null;
  socialLinks: SocialLink[];
};

export default function Hero({
  fullName,
  headline,
  bio,
  location,
  cvUrl,
  socialLinks,
}: HeroProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/10"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-6 py-24 lg:px-8">
        <div className="max-w-4xl">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
            {location ? `Based in ${location}` : "Welcome to my portfolio"}
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Hi, I&apos;m <span className="text-zinc-400">{fullName}</span>
          </h1>

          {headline && (
            <h2 className="mt-6 max-w-3xl text-2xl font-medium leading-relaxed text-zinc-300 sm:text-3xl">
              {headline}
            </h2>
          )}

          {bio && (
            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
              {bio}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
            >
              View my work
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/20 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Contact me
            </a>

            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-6 py-3 font-medium text-zinc-300 transition hover:border-white/40 hover:text-white"
              >
                View CV
              </a>
            )}
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-5">
              {socialLinks.map((socialLink) => (
                <a
                  key={socialLink.id}
                  href={socialLink.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  {(() => {
                    const Icon = getSocialIcon(socialLink.platform);

                    return <Icon className="h-6 w-6" />;
                  })()}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
