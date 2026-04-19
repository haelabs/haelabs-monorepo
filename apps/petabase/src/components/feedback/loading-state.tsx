type LoadingStateProps = {
  label: string;
};

export function LoadingState({ label }: LoadingStateProps) {
  return (
    <div className="pb-loading-shell" role="status" aria-live="polite">
      <div className="pb-state-card">
        <span className="pb-spinner" aria-hidden="true" />
        <p>{label}</p>
      </div>
      <div className="pb-loading-skeleton" aria-hidden="true">
        <span className="pb-skeleton pb-skeleton-line-lg" />
        <span className="pb-skeleton pb-skeleton-line-md" />
        <span className="pb-skeleton pb-skeleton-line-sm" />
      </div>
    </div>
  );
}
