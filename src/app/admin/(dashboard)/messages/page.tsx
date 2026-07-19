import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteMessage } from "./actions";
import { formatDateTime } from "@/lib/date";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{
    deleted?: string;
    updated?: string;
    error?: string;
  }>;
}) {
  const { deleted, updated, error } = await searchParams;

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = messages.filter((message) => !message.isRead).length;

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>

        <p className="mt-2 text-zinc-400">
          Manage messages sent from your portfolio contact form.
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          {unreadCount} unread {unreadCount === 1 ? "message" : "messages"}
        </p>
      </div>

      {deleted === "true" && <Message>Message deleted successfully.</Message>}

      {updated === "unread" && <Message>Message marked as unread.</Message>}

      {error && (
        <div className="mt-6 rounded-lg border border-red-800 bg-red-950 p-4 text-red-300">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="mt-8 space-y-4">
        {messages.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
            No messages yet.
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-center justify-between rounded-xl border p-5 ${
                message.isRead
                  ? "border-zinc-800 bg-zinc-900"
                  : "border-zinc-600 bg-zinc-800"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  {!message.isRead && (
                    <span className="rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white">
                      New
                    </span>
                  )}

                  <h2
                    className={
                      message.isRead ? "font-medium" : "font-bold text-white"
                    }
                  >
                    {message.subject}
                  </h2>
                </div>

                <p className="mt-2 text-sm text-zinc-400">
                  From: {message.name} — {message.email}
                </p>

                <p className="mt-2 max-w-3xl truncate text-sm text-zinc-500">
                  {message.message}
                </p>

                <p className="mt-2 text-xs text-zinc-600">
                  {formatDateTime(message.createdAt)}{" "}
                </p>
              </div>

              <div className="ml-6 flex items-center gap-3">
                <Link
                  href={`/admin/messages/${message.id}`}
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
                >
                  Open
                </Link>

                <form action={deleteMessage.bind(null, message.id)}>
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
