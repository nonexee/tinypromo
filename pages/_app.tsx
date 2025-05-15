// pages/_app.tsx
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';

import '@/globals.css';

/* self-hosted Inter to avoid FOUT */
const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
