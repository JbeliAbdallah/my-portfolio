import { sendContactMessage } from "./contact-actions";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    contactSuccess?: string;
    contactError?: string;
  }>;
}) {
  const { contactSuccess, contactError } = await searchParams;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <section id="contact" className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-widest text-zinc-500">
          Contact
        </p>

        <h1 className="mt-3 text-4xl font-bold">Let&apos;s work together</h1>

        <p className="mt-4 text-zinc-400">
          Send me a message and I&apos;ll get back to you as soon as possible.
        </p>

        {contactSuccess === "true" && (
          <div className="mt-8 rounded-lg border border-green-800 bg-green-950 p-4 text-green-300">
            Your message was sent successfully.
          </div>
        )}

        {contactError && (
          <div className="mt-8 rounded-lg border border-red-800 bg-red-950 p-4 text-red-300">
            Please complete all required fields.
          </div>
        )}

        <form
          action={sendContactMessage}
          className="mt-8 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" required />

            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <Field
            label="Subject"
            name="subject"
            placeholder="How can I help you?"
            required
          />

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm text-zinc-300"
            >
              Message
            </label>

            <textarea
              id="message"
              name="message"
              rows={7}
              required
              placeholder="Write your message..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-white px-6 py-3 font-medium text-black hover:bg-zinc-200"
          >
            Send message
          </button>
        </form>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
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
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
      />
    </div>
  );
}
