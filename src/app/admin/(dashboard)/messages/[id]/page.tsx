import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  deleteMessage,
  markMessageAsRead,
  markMessageAsUnread,
} from "../actions";

export default async function MessagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const message = await prisma.contactMessage.findUnique({
    where: { id },
  });

  if (!message) {
    notFound();
  }

  if (!message.isRead) {
    await prisma.contactMessage.update({
      where: { id: message.id },
      data: { isRead: true },
    });

    message.isRead = true;
  }

  const replySubject = encodeURIComponent(`Re: ${message.subject}`);

  const replyUrl = `mailto:${message.email}?subject=${replySubject}`;

  return (
    <div className="max-w-4xl">
      <Link
        href="/admin/messages"
        className="text-sm text-zinc-400 hover:text-white"
      >
        ← Back to messages
      </Link>

      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-bold">{message.subject}</h1>

          <div className="mt-4 space-y-2 text-sm text-zinc-400">
            <p>
              <span className="text-zinc-500">From:</span> {message.name}
            </p>

            <p>
              <span className="text-zinc-500">Email:</span>{" "}
              <a
                href={`mailto:${message.email}`}
                className="text-white hover:underline"
              >
                {message.email}
              </a>
            </p>

            <p>
              <span className="text-zinc-500">Received:</span>{" "}
              {message.createdAt.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="py-8">
          <p className="whitespace-pre-wrap leading-7 text-zinc-300">
            {message.message}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-zinc-800 pt-6">
          <a
            href={replyUrl}
            className="rounded-lg bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200"
          >
            Reply by email
          </a>

          <form action={markMessageAsUnread.bind(null, message.id)}>
            <button
              type="submit"
              className="rounded-lg border border-zinc-700 px-5 py-3 text-sm hover:bg-zinc-800"
            >
              Mark as unread
            </button>
          </form>

          <form action={deleteMessage.bind(null, message.id)}>
            <button
              type="submit"
              className="rounded-lg border border-red-900 px-5 py-3 text-sm text-red-400 hover:bg-red-950"
            >
              Delete message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
