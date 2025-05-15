import Layout from '@/components/Layout';
import ProviderFormWizard from '@/components/ProviderFormWizard';

export default function Add() {
  return (
    <Layout title="Add your service">
      <h1 className="text-2xl font-semibold mb-4">Add your service</h1>
      <ProviderFormWizard />
    </Layout>
  );
}
