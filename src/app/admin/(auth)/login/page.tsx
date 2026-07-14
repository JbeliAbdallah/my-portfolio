import { login } from "./actions";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <form
        action={login}
        className="w-full max-w-md space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in to manage your portfolio.
          </p>
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-zinc-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm text-zinc-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-white px-4 py-3 font-medium text-black hover:bg-zinc-200"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
