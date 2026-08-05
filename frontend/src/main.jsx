import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, color: '#DC2626', background: '#FFFFFF', fontFamily: 'sans-serif', margin: 20, borderRadius: 16, border: '2px solid #F87171' }}>
          <h2 style={{ fontSize: 24, fontWeight: 'bold' }}>Application Render Error</h2>
          <p style={{ fontWeight: '600' }}>{this.state.error?.toString()}</p>
          <pre style={{ background: '#FEE2E2', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 12 }}>
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
