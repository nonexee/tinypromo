import { GetStaticProps } from 'next';
import Head from 'next/head';
import { createClient } from '@supabase/supabase-js';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Provider = {
  id: string;
  name: string;
  city: string;
  service: string;
  whatsapp: string;
  tagline: string;
  photo?: string;
};

type Props = {
  latest: Provider[];
  categories: string[];
  cities: string[];
};

export default function Home({ latest, categories, cities }: Props) {
  /* Hero search state */
  const [city, setCity] = useState('');
  const [service, setService] = useState('');

  /* Prefill city from geolocation */
  useEffect(() => {
    if (navigator.geolocation && city === '') {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          if (data.address?.city) setCity(data.address.city.toLowerCase());
        } catch (_) {
          /* silent fail */
        }
      });
    }
  }, [city]);

  /* Helper builds JSON-LD */
  const buildJsonLd = (p: Provider) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: p.name,
    description: p.tagline,
    areaServed: p.city,
    url: `https://tinypromo.vercel.app/${p.city}/${p.service}#${p.id}`,
    telephone: p.whatsapp ? `+${p.whatsapp}` : undefined,
    image: p.photo,
  });

  return (
    <Layout>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(latest.map(buildJsonLd)),
          }}
        />
      </Head>

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
          {/* city input w/ datalist */}
          <input
            list="city-list"
            className="border p-3 rounded flex-1"
            placeholder="City (e.g. belgrade)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <datalist id="city-list">
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </datalist>

          {/* service input w/ datalist */}
          <input
            list="service-list"
            className="border p-3 rounded flex-1"
            placeholder="Service (e.g. cleaners)"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
          <datalist id="service-list">
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </datalist>

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

  /* All providers list for datalists */
  const { data: all = [] } = await supabase
    .from('providers')
    .select('city, service');

  const categories = Array.from(
    new Set(all.map((p) => p.service))
  ).slice(0, 25); /* first 25 unique */
  const cities = Array.from(new Set(all.map((p) => p.city))).slice(0, 50);

  return {
    props: { latest, categories, cities },
    revalidate: 30,
  };
};
