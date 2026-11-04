export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--background)] pt-32">
      <div className="container flex min-h-[60vh] items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Loading project
          </p>

          <div className="mt-4 h-2 w-32 animate-pulse bg-[var(--surface)]" />
        </div>
      </div>
    </main>
  );
}