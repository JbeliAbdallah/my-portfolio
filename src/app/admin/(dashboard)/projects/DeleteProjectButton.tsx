"use client";

import { deleteProject } from "./actions";

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  return (
    <form
      action={deleteProject.bind(null, projectId)}
      onSubmit={(event) => {
        if (!window.confirm("Are you sure you want to delete this project?")) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-red-900 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
      >
        Delete
      </button>
    </form>
  );
}
