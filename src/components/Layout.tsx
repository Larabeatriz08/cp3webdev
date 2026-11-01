import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import PageLoader from './PageLoader'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-line">
        <nav
          className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4"
          aria-label="Principal"
        >
          <NavLink to="/" className="font-bold">
            Portfólio
          </NavLink>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
