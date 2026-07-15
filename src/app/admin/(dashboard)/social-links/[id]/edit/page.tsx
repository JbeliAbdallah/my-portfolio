import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateSocialLink } from "../../actions";

export default async function EditSocialLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const socialLink = await prisma.socialLink.findUnique({
    where: { id },
  });

  if (!socialLink) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/social-links"
        className="text-sm text-zinc-400 hover:text-white"
      >
        ← Back to social links
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Edit Social Link</h1>

      <form
        action={updateSocialLink.bind(null, socialLink.id)}
        className="mt-8 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <Field
          label="Platform"
          name="platform"
          defaultValue={socialLink.platform}
          required
        />

        <Field
          label="URL"
          name="url"
          type="url"
          defaultValue={socialLink.url}
          required
        />

        <Field label="Icon" name="icon" defaultValue={socialLink.icon} />

        <Field
          label="Display order"
          name="order"
          type="number"
          defaultValue={socialLink.order.toString()}
        />

        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input
            name="isVisible"
            type="checkbox"
            defaultChecked={socialLink.isVisible}
            className="h-4 w-4"
          />
          Visible on portfolio
        </label>

        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | null;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-zinc-300">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
      />
    </div>
  );
}
