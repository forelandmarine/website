"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-bg0">
      <div className="text-center px-4">
        <h2 className="text-2xl font-light text-white mb-4">Something went wrong</h2>
        <button
          onClick={() => reset()}
          className="bg-accent text-white font-semibold text-sm px-6 py-3 rounded hover:bg-accent/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
