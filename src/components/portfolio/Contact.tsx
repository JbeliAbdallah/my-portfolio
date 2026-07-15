import { sendContactMessage } from "@/app/contact-actions";

type ContactProps = {
  email: string | null;
  contactSuccess?: string;
  contactError?: string;
};

export default function Contact({
  email,
  contactSuccess,
  contactError,
}: ContactProps) {
  return (
    <section
      id="contact"
      className="border-b border-white/10 px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
              Contact
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s build something together.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
              Have a project, opportunity, or idea in mind? Send me a message
              and I&apos;ll get back to you as soon as possible.
            </p>

            {email && (
              <div className="mt-10">
                <p className="text-sm text-zinc-500">Email</p>

                <a
                  href={`mailto:${email}`}
                  className="mt-2 inline-block break-all text-lg font-medium text-white transition hover:text-violet-300"
                >
                  {email}
                </a>
              </div>
            )}
          </div>

          <div>
            {contactSuccess === "true" && (
              <div className="mb-6 rounded-xl border border-green-800 bg-green-950/50 p-4 text-green-300">
                Your message was sent successfully.
              </div>
            )}

            {contactError && (
              <div className="mb-6 rounded-xl border border-red-800 bg-red-950/50 p-4 text-red-300">
                Please complete all required fields.
              </div>
            )}

            <form
              action={sendContactMessage}
              className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  placeholder="Your name"
                  required
                />

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
                  placeholder="Tell me about your project or idea..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-white px-7 py-3 font-medium text-black transition hover:bg-zinc-200"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
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
        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
      />
    </div>
  );
}
