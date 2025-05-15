import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} | TinyPromo` : 'TinyPromo'}</title>
        <meta name='description' content='Instant landing pages for local services' />
      </Head>
      <header className='w-full p-4 bg-white shadow'>
        <nav className='max-w-4xl mx-auto flex justify-between'>
          <Link href='/' className='font-bold text-lg'>TinyPromo</Link>
          <Link href='/' className='text-sm underline'>Add your service</Link>
        </nav>
      </header>
      <main className='max-w-4xl mx-auto p-4'>{children}</main>
    </>
  );
}
