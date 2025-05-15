import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { createClient } from '@supabase/supabase-js';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import Pagination from '@/components/Pagination';
import { useMemo, useState } from 'react';

const PAGE_SIZE = 12;

interface Props {
  providers: any[];
  total: number;
  page: number;
}

export default function All({ providers, total, page }: Props) {
  /* —–––– client-side filters —–––– */
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
        p.tagline?.toLowerCase().includes(q.toLowerCase());
      const matchesCat = category ? p.service === category : true;
      return matchesQ && matchesCat;
    });
  }, [providers, q, category]);

  return (
    <Layout title="All services">
      <h1 className="text-2xl font-semibold mb-4">All services</h1>

      {/* Search box */}
      <input
        className="border p-2 rounded w-full max-w-sm mb-4"
        placeholder="Search by name or keyword…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto mb-6">
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

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ServiceCard key={p.id} provider={p} />
        ))}
      </div>

      {/* Pager (only shows if no filters) */}
      {category === null && q === '' && (
        <Pagination
          page={page}
          hasMore={page * PAGE_SIZE < total}
        />
      )}
    </Layout>
  );
}

/* ––––– ISR with page params ––––– */
interface Params extends ParsedUrlQuery {
  page?: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const page = params?.page ? parseInt(params.page, 10) : 1;
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
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  /* Pre-generate only the first page to keep build fast */
  return {
    paths: [{ params: { page: '1' } }],
    fallback: 'blocking',
  };
};
