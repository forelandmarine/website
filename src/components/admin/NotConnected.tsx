export function NotConnected() {
  return (
    <div className="fm-admin flex min-h-screen items-center justify-center bg-slate-50 p-8">
      <div className="max-w-md rounded-lg border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-xl font-semibold text-slate-900">Operations not connected</h1>
        <p className="mt-3 text-sm text-slate-500">
          The operations database is not configured. Set NEXT_PUBLIC_SUPABASE_URL and
          NEXT_PUBLIC_SUPABASE_ANON_KEY and reload.
        </p>
      </div>
    </div>
  );
}
