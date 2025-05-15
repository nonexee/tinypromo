// components/ProviderForm.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';

export default function ProviderForm() {
  const [state, setState] = useState({
    name: '',
    city: '',
    service: '',
    whatsapp: '',
    tagline: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('providers').insert([state]);

    setLoading(false);
    if (error) {
      alert(error.message);
      return;
    }

    alert('Submitted! You are live.');
    router.push(`/${state.city.toLowerCase()}/${state.service.toLowerCase()}`);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 max-w-md">
      {['name', 'city', 'service', 'whatsapp', 'tagline'].map((f) => (
        <input
          key={f}
          name={f}
          placeholder={f}
          className="border p-2 rounded"
          value={(state as any)[f]}
          onChange={handleChange}
          required
        />
      ))}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded"
      >
        {loading ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  );
}
