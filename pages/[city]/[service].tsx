import { GetServerSideProps } from 'next';
import { createClient } from '@supabase/supabase-js';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';

export default function Directory({ providers, city, service }: any) {
  return (
    <Layout title={`${service} in ${city}`}>
      <h1 className='text-2xl font-semibold mb-4 capitalize'>
        {service} in {city}
      </h1>
      <div className='grid gap-4 md:grid-cols-2'>
        {providers.map((p: any) => (
          <ServiceCard key={p.id} provider={p} />
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase
    .from('providers')
    .select('*')
    .eq('city', params!.city)
    .eq('service', params!.service);

  return {
    props: {
      providers: data || [],
      city: params!.city,
      service: params!.service,
    },
  };
};
