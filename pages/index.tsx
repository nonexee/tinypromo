import { GetStaticProps } from 'next';
import { createClient } from '@supabase/supabase-js';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  latest: any[];
  categories: string[];
};

export default function Home({ latest, categories }: Props) {
  /* local search */
  const [city, setCity] = useState('');
  const [service, setService] = useState('');

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-transparent text-center">
        <h1 className="text-4xl font-bold mb-4">
          Find trusted local services, fast
        </h1>
        <p className="text-gray-600 mb-8">
          Cleaners • Tutors • Barbers • Handypeople — worldwide
        </p>

        {/* Search inputs */}
        <div className="mx-auto flex flex-col sm:flex-row gap-3 w-full max-w-lg">
          <input
            className="border p-3 rounded flex-1"
            placeholder="City (e.g. belgrade)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="border p-3 rounded flex-1"
            placeholder="Service (e.g. cleaners)"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
          <Link
            href={
              city && service
                ? `/${city.toLowerCase()}/${service.toLowerCase()}`
                : '/all'
            }
            className="bg-blue-600 text-white rounded px-6 flex items-center justify-center"
          >
            Search
          </Link>
        </div>
      </section>

      {/* ── Top categories ───────────────────────── */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-xl font-semibold mb-4">Top categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/all?service=${encodeURIComponent(c)}`}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm capitalize hover:bg-blue-600 hover:text-white transition"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Latest listings ──────────────────────── */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-xl font-semibold">Latest listings</h2>
          <Link href="/all" className="underline text-sm">
            Browse all →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((p) => (
            <ServiceCard key={p.id} provider={p} />
          ))}
        </div>
      </section>

      {/* ── CTA strip ───────────────────────────── */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Offer a local service?
        </h2>
        <p className="mb-6">
          Create your page in 30&nbsp;seconds, get found by customers.
        </p>
        <Link
          href="/add"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow"
        >
          Add your service — it’s free
        </Link>
      </section>
    </Layout>
  );
}

/* ── Data for ISR ─────────────────────────────── */
export const getStaticProps: GetStaticProps<Props> = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  /* Latest 6 */
  const { data: latest = [] } = await supabase
    .from('providers')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  /* Distinct top categories by frequency */
  const { data: allCats = [] } = await supabase
    .from('providers')
    .select('service');

  const freq: Record<string, number> = {};
  allCats.forEach((p) => {
    freq[p.service] = (freq[p.service] || 0) + 1;
  });
  const categories = Object.keys(freq)
    .sort((a, b) => freq[b] - freq[a]) /* descending popularity */
    .slice(0, 10); /* top-10 */

  return {
    props: { latest, categories },
    revalidate: 30,
  };
};
