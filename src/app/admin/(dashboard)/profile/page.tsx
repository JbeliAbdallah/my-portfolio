import { prisma } from "@/lib/prisma";
import { saveProfile } from "./actions";

type Props = {
  searchParams: Promise<{
    saved?: string;
    error?: string;
  }>;
};

export default async function ProfilePage({ searchParams }: Props) {
  const { saved, error } = await searchParams;
  const profile = await prisma.profile.findFirst();

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold">Profile</h1>

      <p className="mt-2 text-zinc-400">
        Manage your public portfolio information.
      </p>

      {saved === "true" && (
        <div className="mt-6 rounded-lg border border-green-800 bg-green-950 p-4 text-green-300">
          Profile saved successfully.
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <form
        action={saveProfile}
        className="mt-8 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <Field
          label="Full name"
          name="fullName"
          defaultValue={profile?.fullName}
          required
        />

        <Field
          label="Headline"
          name="headline"
          defaultValue={profile?.headline}
        />

        <div>
          <label htmlFor="bio" className="mb-2 block text-sm text-zinc-300">
            Bio
          </label>

          <textarea
            id="bio"
            name="bio"
            rows={6}
            defaultValue={profile?.bio ?? ""}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <Field
          label="Location"
          name="location"
          defaultValue={profile?.location}
        />

        <Field
          label="Email"
          name="email"
          type="email"
          defaultValue={profile?.email}
        />

        <Field label="Phone" name="phone" defaultValue={profile?.phone} />

        <div>
          <label htmlFor="avatar" className="mb-2 block text-sm text-zinc-300">
            Avatar
          </label>

          <input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3"
          />
        </div>

        <div>
          <label htmlFor="cv" className="mb-2 block text-sm text-zinc-300">
            CV (PDF)
          </label>

          {profile?.cvUrl && (
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 block text-sm text-blue-400 hover:underline"
            >
              View current CV
            </a>
          )}

          <input
            id="cv"
            name="cv"
            type="file"
            accept=".pdf,application/pdf"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
        >
          Save profile
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
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-500"
      />
    </div>
  );
}
