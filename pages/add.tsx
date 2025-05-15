import Layout from '@/components/Layout';
import ProviderForm from '@/components/ProviderForm';

export default function AddService() {
  return (
    <Layout title="Add your service">
      <h1 className="text-2xl font-semibold mb-4">Add your service</h1>
      <ProviderForm />
    </Layout>
  );
}
