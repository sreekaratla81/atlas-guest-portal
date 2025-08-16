import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; message?: string };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(err: unknown) {
    return { hasError: true, message: (err as Error)?.message ?? String(err) };
  }
  componentDidCatch(err: unknown, info: unknown) {
    console.error("Render error:", err, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16 }}>
          <h1>Something went wrong.</h1>
          <pre data-testid="render-error">{this.state.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
