import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { prisma } from "@/lib/prisma";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const [settings, profile] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.profile.findFirst(),
  ]);

  const siteName = settings?.siteName || profile?.fullName || "My Portfolio";

  const description =
    settings?.siteDescription ||
    profile?.headline ||
    profile?.bio ||
    "Personal portfolio website";

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },

    description,

    icons: settings?.faviconUrl
      ? {
          icon: settings.faviconUrl,
        }
      : undefined,

    openGraph: {
      title: siteName,
      description,
      type: "website",
      images: settings?.logoUrl
        ? [
            {
              url: settings.logoUrl,
              alt: siteName,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
      images: settings?.logoUrl ? [settings.logoUrl] : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
