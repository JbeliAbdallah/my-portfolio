import { prisma } from "@/lib/prisma";

import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Services from "@/components/portfolio/Services";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Education from "@/components/portfolio/Education";
import Courses from "@/components/portfolio/Courses";
import Videos from "@/components/portfolio/Videos";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    contactSuccess?: string;
    contactError?: string;
  }>;
}) {
  const { contactSuccess, contactError } = await searchParams;

  const [
    profile,
    settings,
    socialLinks,
    services,
    skills,
    projects,
    experiences,
    education,
    courses,
    videos,
  ] = await Promise.all([
    prisma.profile.findFirst(),

    prisma.siteSettings.findFirst(),

    prisma.socialLink.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
    }),

    prisma.service.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
    }),

    prisma.skill.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
    }),

    prisma.project.findMany({
      where: { isVisible: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),

    prisma.experience.findMany({
      where: { isVisible: true },
      orderBy: [{ order: "asc" }, { startDate: "desc" }],
    }),

    prisma.education.findMany({
      where: { isVisible: true },
      orderBy: [{ order: "asc" }, { startDate: "desc" }],
    }),

    prisma.course.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    }),

    prisma.video.findMany({
      where: { isVisible: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  const siteName = settings?.siteName || profile?.fullName || "My Portfolio";

  const fullName = profile?.fullName || "Your Name";

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar siteName={siteName} />

      <Hero
        fullName={fullName}
        headline={profile?.headline ?? null}
        bio={profile?.bio ?? null}
        location={profile?.location ?? null}
        cvUrl={profile?.cvUrl ?? null}
        socialLinks={socialLinks}
      />

      <About
        fullName={fullName}
        bio={profile?.bio ?? null}
        location={profile?.location ?? null}
        email={profile?.email ?? null}
        phone={profile?.phone ?? null}
        avatarUrl={profile?.avatarUrl ?? null}
      />

      <Services services={services} />

      <Skills skills={skills} />

      <Projects projects={projects} />

      <Experience experiences={experiences} />

      <Education education={education} />

      <Courses courses={courses} />

      <Videos videos={videos} />

      <Contact
        email={profile?.email ?? null}
        contactSuccess={contactSuccess}
        contactError={contactError}
      />

      <Footer siteName={siteName} socialLinks={socialLinks} />
    </main>
  );
}
