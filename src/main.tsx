import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter as Router } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import FallbackPage from "./pages/FallbackPage"

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <ErrorBoundary
          fallback={
            <FallbackPage
              title="Something went wrong"
              message="Please refresh the page or try again later."
            />
          }
        >
          <App />
        </ErrorBoundary>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)
