import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.js';
import { ErrorBoundary } from './components/ErrorBoundary.js';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Hide the loading fallback once React has mounted
const fallback = document.getElementById('loading-fallback');
if (fallback) {
  fallback.classList.add('hidden');
}
