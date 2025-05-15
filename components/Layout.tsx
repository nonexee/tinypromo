import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <>
      <Head>
        <title>{title ? `${title} | TinyPromo` : 'TinyPromo'}</title>
        <meta
          name="description"
          content="Instant landing pages for local services worldwide"
        />
        {/* Plausible analytics */}
        <script
          async
          defer
          data-domain="tinypromo.vercel.app"
          src="https://plausible.io/js/plausible.js"
        />
      </Head>

      <header className="w-full p-4 bg-white shadow">
        <nav className="max-w-4xl mx-auto flex gap-4">
          <Link href="/" className="font-bold text-lg">
            TinyPromo
          </Link>
          <Link href="/all" className="text-sm underline">
            Browse all
          </Link>
          <Link href="/add" className="text-sm underline ml-auto">
            Add your service
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-4">{children}</main>
    </>
  );
}
