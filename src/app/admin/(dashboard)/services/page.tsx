import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteService } from "./actions";

export default async function ServicesPage({
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

  const services = await prisma.service.findMany({
    orderBy: [{ order: "asc" }, { title: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="mt-2 text-zinc-400">Manage the services you offer.</p>
        </div>

        <Link
          href="/admin/services/new"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black hover:bg-zinc-200"
        >
          Add service
        </Link>
      </div>

      {created === "true" && (
        <div className="mt-6 rounded-lg border border-green-800 bg-green-950 p-4 text-green-300">
          Service created successfully.
        </div>
      )}

      {updated === "true" && (
        <div className="mt-6 rounded-lg border border-green-800 bg-green-950 p-4 text-green-300">
          Service updated successfully.
        </div>
      )}

      {deleted === "true" && (
        <div className="mt-6 rounded-lg border border-green-800 bg-green-950 p-4 text-green-300">
          Service deleted successfully.
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-lg border border-red-800 bg-red-950 p-4 text-red-300">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="mt-8 space-y-4">
        {services.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
            No services yet.
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <div>
                <h2 className="font-semibold">{service.title}</h2>
                <p className="mt-1 max-w-2xl text-sm text-zinc-400">
                  {service.description}
                </p>
                <p className="mt-2 text-xs text-zinc-500">
                  Order: {service.order} •{" "}
                  {service.isVisible ? "Visible" : "Hidden"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/services/${service.id}/edit`}
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
                >
                  Edit
                </Link>

                <form action={deleteService.bind(null, service.id)}>
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
