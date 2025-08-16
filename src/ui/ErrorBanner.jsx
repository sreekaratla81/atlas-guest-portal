export function ErrorBanner({ title = 'Error', details, onRetry }) {
  return (
    <div role="alert" className="border border-red-300 bg-red-50 p-3 rounded-lg mb-4">
      <div className="font-semibold">{title}</div>
      {details && <pre className="text-xs mt-1 whitespace-pre-wrap">{details}</pre>}
      {onRetry && (
        <button className="mt-2 px-3 py-1 border rounded" onClick={onRetry}>
          Retry
        </button>
      )}
      <div className="text-xs mt-2 opacity-70">
        Tip: Open DevTools → Network to inspect the failing request. If you see CORS, enable it on atlas-api.
      </div>
    </div>
  );
}
