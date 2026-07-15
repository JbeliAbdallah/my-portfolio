type SocialLink = {
  id: string;
  platform: string;
  url: string;
};

type FooterProps = {
  siteName: string;
  socialLinks: SocialLink[];
};

export default function Footer({ siteName, socialLinks }: FooterProps) {
  return (
    <footer className="px-6 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <a href="#home" className="font-semibold text-white">
            {siteName}
          </a>

          <p className="mt-2 text-sm text-zinc-500">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
        </div>

        {socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-5">
            {socialLinks.map((socialLink) => (
              <a
                key={socialLink.id}
                href={socialLink.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-zinc-500 transition hover:text-white"
              >
                {socialLink.platform} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
