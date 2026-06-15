import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from './ui/toast'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme accentColor="purple" grayColor="gray" radius="medium">
        <ToastProvider>
          <App />
        </ToastProvider>
      </Theme>
    </QueryClientProvider>
  </StrictMode>,
)
