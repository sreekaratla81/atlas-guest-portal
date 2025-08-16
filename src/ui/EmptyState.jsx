export function EmptyState({ title, subtitle }) {
  return (
    <div className="border border-gray-200 bg-white p-6 rounded-lg text-center">
      <div className="text-lg font-medium">{title}</div>
      {subtitle && <div className="text-sm text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
}
