import type { ReactNode } from 'react'
import { Header, Footer } from '.'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div id="top">
      <div className="grain" />
      <Header />
      {children}
      <Footer />
    </div>
  )
}
