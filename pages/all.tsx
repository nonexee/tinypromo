// pages/all.tsx
import { GetServerSideProps } from 'next';
import { createClient } from '@supabase/supabase-js';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import Pagination from '@/components/Pagination';
import { useMemo, useState } from 'react';

const PAGE_SIZE = 12;

type Provider = {
  id: string;
  name: string;
  city: string;
  service: string;
  whatsapp: string;
  tagline: string;
  photo?: string;
  created_at: string;
};

interface Props {
  providers: Provider[];
  total: number;
  page: number;
}

export default function All({ providers, total, page }: Props) {
  /* client-side search / filter state */
  const [q, setQ] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(providers.map((p) => p.service))).sort(),
    [providers]
  );

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      const matchesQ =
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        (p.tagline ?? '').toLowerCase().includes(q.toLowerCase());
      const matchesCat = category ? p.service === category : true;
      return matchesQ && matchesCat;
    });
  }, [providers, q, category]);

  return (
    <Layout title="All services">
      <h1 className="text-2xl font-semibold mb-4">All services</h1>

      {/* search box */}
      <input
        className="border p-2 rounded w-full max-w-sm mb-4"
        placeholder="Search by name or keyword…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {/* category chips */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setCategory(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            category === null ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              category === c ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* provider cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ServiceCard key={p.id} provider={p} />
        ))}
      </div>

      {/* pager (only when no client filters) */}
      {category === null && q === '' && (
        <Pagination page={page} hasMore={page * PAGE_SIZE < total} />
      )}
    </Layout>
  );
}

/* — server-side pagination — */
export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: providers = [], count } = await supabase
    .from('providers')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  return {
    props: {
      providers,
      total: count ?? 0,
      page,
    },
  };
};

