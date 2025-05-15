'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';

export default function ProviderFormWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', city: '', service: '', whatsapp: '', tagline: '', photo: '' });
  const router = useRouter();

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  const submit = async () => {
    setLoading(true);
    const { error } = await supabase.from('providers').insert([form]);
    setLoading(false);
    if (error) return alert(error.message);
    alert('🎉 Your page is live! Share it with your friends.');
    router.push(`/${form.city}/${form.service}`);
  };

  const input = (k: keyof typeof form, p: string) => (
    <input
      required
      className="border p-2 rounded w-full"
      placeholder={k}
      value={form[k]}
      onChange={(e) => setForm({ ...form, [k]: e.target.value })}
    />
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow max-w-md mx-auto">
      {step === 1 && (
        <>
          <h3 className="font-semibold mb-2">Basic info</h3>
          {input('name', 'Name')}
          {input('service', 'Service (e.g., cleaner)')}
          <button className="mt-4 btn" onClick={next}>Next →</button>
        </>
      )}
      {step === 2 && (
        <>
          <h3 className="font-semibold mb-2">Contact</h3>
          {input('city', 'City')}
          {input('whatsapp', 'WhatsApp (digits only)')}
          <button className="mt-4 mr-2 btn" onClick={prev}>← Back</button>
          <button className="mt-4 btn" onClick={next}>Next →</button>
        </>
      )}
      {step === 3 && (
        <>
          <h3 className="font-semibold mb-2">Tagline & Photo</h3>
          {input('tagline', 'Short tagline')}
          {/* (optional photo upload skipped for brevity) */}
          <button className="mt-4 mr-2 btn" onClick={prev}>← Back</button>
          <button className="mt-4 btn bg-brand text-white" disabled={loading} onClick={submit}>
            {loading ? 'Submitting…' : 'Publish'}
          </button>
        </>
      )}
    </div>
  );
}
