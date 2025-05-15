import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function Layout({ children, title }: { children: ReactNode; title?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Head>
        <title>{title ? `${title} | TinyPromo` : 'TinyPromo'}</title>
        <meta name="description" content="Instant landing pages for local services" />
        <script async defer data-domain="tinypromo.vercel.app" src="https://plausible.io/js/plausible.js" />
      </Head>

      {/* top nav */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-gray-800/70 backdrop-blur shadow">
        <nav className="max-w-5xl mx-auto flex items-center gap-4 p-4">
          <Link href="/" className="font-bold text-lg text-brand">TinyPromo</Link>
          <Link href="/all" className="text-sm underline hidden sm:inline">Browse all</Link>
          <Link href="/add" className="text-sm underline ml-auto">Add</Link>

          {/* dark-mode toggle */}
          <button
            aria-label="Toggle dark mode"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto p-4">{children}</main>

      {/* mobile sticky nav */}
      <BottomNav />
    </>
  );
}
