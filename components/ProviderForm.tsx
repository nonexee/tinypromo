import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProviderForm() {
  const [state, setState] = useState({ name: '', city: '', service: '', whatsapp: '', tagline: '' });
  const [loading, setLoading] = useState(false);
  const handleChange = (e: any) => setState({ ...state, [e.target.name]: e.target.value });

  const submit = async () => {
    setLoading(True);
    const { data, error } = await supabase.from('providers').insert(state);
    setLoading(False);
    if (error) alert(error.message);
    else alert('Submitted! You are live.');
  };

  return (
    <div className='flex flex-col gap-2 max-w-md'>
      {['name','city','service','whatsapp','tagline'].map((f) => (
        <input key={f} name={f} placeholder={f} className='border p-2 rounded' onChange={handleChange} />
      ))}
      <button onClick={submit} disabled={loading} className='bg-blue-600 text-white p-2 rounded'>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
}
