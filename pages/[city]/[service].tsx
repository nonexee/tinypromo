import { GetServerSideProps } from 'next';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import Breadcrumb from '@/components/Breadcrumb';
import ReviewModal from '@/components/ReviewModal';

type Provider = {
  id: string;
  name: string;
  city: string;
  service: string;
  whatsapp: string;
  tagline: string;
  photo?: string;
  avg_rating?: number;
};

interface Props {
  providers: Provider[];
  city: string;
  service: string;
}

export default function DirectoryPage({ providers, city, service }: Props) {
  const [showReview, setShowReview] = useState(false);
  const firstId = providers[0]?.id ?? '';

  return (
    <Layout title={`${service} in ${city}`}>
      <Breadcrumb city={city} service={service} />

      <header className="flex items-baseline justify-between mb-4">
        <h1 className="text-2xl font-semibold capitalize">
          {service} in {city}
        </h1>
        {firstId && (
          <button onClick={() => setShowReview(true)} className="underline text-sm">
            Add review
          </button>
        )}
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {providers.map((p) => (
          <ServiceCard key={p.id} provider={p} />
        ))}
      </div>

      {showReview && (
        <ReviewModal providerId={firstId} onClose={() => setShowReview(false)} />
      )}
    </Layout>
  );
}

/* -------- data -------- */
export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const city = (params?.city as string).toLowerCase();
  const service = (params?.service as string).toLowerCase();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: providers = [] } = await supabase
    .from('providers')
    .select('*')
    .eq('city', city)
    .eq('service', service)
    .order('avg_rating', { ascending: false })
    .order('created_at', { ascending: false });

  return { props: { providers, city, service } };
};
