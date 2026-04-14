type LoadingStateProps = {
  label: string;
};

export function LoadingState({ label }: LoadingStateProps) {
  return (
    <div className="pb-state-card" role="status" aria-live="polite">
      <span className="pb-spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
