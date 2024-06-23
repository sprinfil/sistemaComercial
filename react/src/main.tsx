import React from 'react'
import ReactDOM from 'react-dom/client'
import "./globals.css";
import { ContextProvider } from './contexts/ContextProvider.tsx';
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx';
import { ThemeProvider } from './components/ui/theme-provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
