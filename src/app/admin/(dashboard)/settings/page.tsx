import { prisma } from "@/lib/prisma";
import { saveSiteSettings } from "./actions";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    saved?: string;
    error?: string;
  }>;
}) {
  const { saved, error } = await searchParams;

  const settings = await prisma.siteSettings.findFirst();

  return (
    <div className="max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>

        <p className="mt-2 text-zinc-400">
          Manage the global settings for your portfolio website.
        </p>
      </div>

      {saved === "true" && (
        <div className="mt-6 rounded-lg border border-green-800 bg-green-950 p-4 text-green-300">
          Site settings saved successfully.
        </div>
      )}

      {error === "missing-site-name" && (
        <div className="mt-6 rounded-lg border border-red-800 bg-red-950 p-4 text-red-300">
          Site name is required.
        </div>
      )}

      <form
        action={saveSiteSettings}
        className="mt-8 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <Field
          label="Site name"
          name="siteName"
          defaultValue={settings?.siteName}
          placeholder="My Portfolio"
          required
        />

        <div>
          <label
            htmlFor="siteDescription"
            className="mb-2 block text-sm text-zinc-300"
          >
            Site description
          </label>

          <textarea
            id="siteDescription"
            name="siteDescription"
            rows={5}
            defaultValue={settings?.siteDescription ?? ""}
            placeholder="A short description of your portfolio..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
          />
        </div>

        <Field
          label="Logo URL"
          name="logoUrl"
          type="url"
          defaultValue={settings?.logoUrl}
          placeholder="https://..."
        />

        <Field
          label="Favicon URL"
          name="faviconUrl"
          type="url"
          defaultValue={settings?.faviconUrl}
          placeholder="https://..."
        />

        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200"
        >
          Save settings
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
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | null;
  placeholder?: string;
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
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
      />
    </div>
  );
}
