type AboutProps = {
  fullName: string;
  bio: string | null;
  location: string | null;
  email: string | null;
  phone: string | null;
  avatarUrl: string | null;
};

export default function About({
  fullName,
  bio,
  location,
  email,
  phone,
  avatarUrl,
}: AboutProps) {
  return (
    <section
      id="about"
      className="border-b border-white/10 px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
              About me
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              More than just code.
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-400">
              {bio ? (
                <p className="whitespace-pre-line">{bio}</p>
              ) : (
                <p>
                  I&apos;m {fullName}, a developer focused on building useful,
                  reliable, and thoughtful digital experiences.
                </p>
              )}
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {location && <InfoItem label="Location" value={location} />}

              {email && <InfoItem label="Email" value={email} />}

              {phone && <InfoItem label="Phone" value={phone} />}
            </div>
          </div>

          <div>
            {avatarUrl ? (
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl}
                  alt={fullName}
                  className="aspect-square h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/20 via-white/5 to-blue-500/10">
                <span className="text-8xl font-bold text-white/10">
                  {getInitials(fullName)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-1 break-words font-medium text-zinc-200">{value}</p>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
