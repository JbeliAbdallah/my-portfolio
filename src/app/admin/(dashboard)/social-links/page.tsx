import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSocialLink } from "./actions";

export default async function SocialLinksPage({
  searchParams,
}: {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    deleted?: string;
    error?: string;
  }>;
}) {
  const { created, updated, deleted, error } = await searchParams;

  const socialLinks = await prisma.socialLink.findMany({
    orderBy: [{ order: "asc" }, { platform: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Social Links</h1>
          <p className="mt-2 text-zinc-400">
            Manage your social media and external profile links.
          </p>
        </div>

        <Link
          href="/admin/social-links/new"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200"
        >
          Add social link
        </Link>
      </div>

      {created === "true" && (
        <Message>Social link created successfully.</Message>
      )}

      {updated === "true" && (
        <Message>Social link updated successfully.</Message>
      )}

      {deleted === "true" && (
        <Message>Social link deleted successfully.</Message>
      )}

      {error && (
        <div className="mt-6 rounded-lg border border-red-800 bg-red-950 p-4 text-red-300">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="mt-8 space-y-4">
        {socialLinks.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
            No social links yet.
          </div>
        ) : (
          socialLinks.map((socialLink) => (
            <div
              key={socialLink.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <div>
                <h2 className="font-semibold">{socialLink.platform}</h2>

                <p className="mt-1 max-w-2xl truncate text-sm text-zinc-400">
                  {socialLink.url}
                </p>

                <p className="mt-2 text-xs text-zinc-500">
                  Order: {socialLink.order}
                  {" • "}
                  {socialLink.isVisible ? "Visible" : "Hidden"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/social-links/${socialLink.id}/edit`}
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
                >
                  Edit
                </Link>

                <form action={deleteSocialLink.bind(null, socialLink.id)}>
                  <button
                    type="submit"
                    className="rounded-lg border border-red-900 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Message({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-lg border border-green-800 bg-green-950 p-4 text-green-300">
      {children}
    </div>
  );
}
