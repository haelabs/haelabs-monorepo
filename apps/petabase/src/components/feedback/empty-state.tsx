type EmptyStateProps = {
  label: string;
};

export function EmptyState({ label }: EmptyStateProps) {
  return <div className="pb-state-card">{label}</div>;
}
