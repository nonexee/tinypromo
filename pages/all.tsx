import { GetServerSideProps } from 'next';
import { createClient } from '@supabase/supabase-js';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';

type Props = { providers: any[] };

export default function All({ providers }: Props) {
  return (
    <Layout title="All services">
      <h1 className="text-2xl font-semibold mb-4">All services</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {providers.map((p) => (
          <ServiceCard key={p.id} provider={p} />
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase
    .from('providers')
    .select('*')
    .order('created_at', { ascending: false });   // newest first

  return { props: { providers: data || [] } };
};
