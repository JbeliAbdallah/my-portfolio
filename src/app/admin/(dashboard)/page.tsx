import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [projects, skills, services, courses, videos, unreadMessages] =
    await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.service.count(),
      prisma.course.count(),
      prisma.video.count(),
      prisma.contactMessage.count({
        where: { isRead: false },
      }),
    ]);

  const stats = [
    { label: "Projects", value: projects },
    { label: "Skills", value: skills },
    { label: "Services", value: services },
    { label: "Courses", value: courses },
    { label: "Videos", value: videos },
    { label: "Unread Messages", value: unreadMessages },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-zinc-400">Overview of your portfolio content.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <p className="text-sm text-zinc-400">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
