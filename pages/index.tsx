import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [service, setService] = useState('');

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-4'>
      <h1 className='text-3xl font-bold mb-6'>Find Trusted Local Services</h1>

      <div className='flex flex-col gap-4 w-full max-w-sm'>
        <input
          className='border p-2 rounded'
          placeholder='City (e.g. belgrade)'
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <input
          className='border p-2 rounded'
          placeholder='Service (e.g. cleaners)'
          value={service}
          onChange={e => setService(e.target.value)}
        />
        <button
          className='bg-blue-600 text-white p-2 rounded'
          onClick={() => {
            if (!city || !service) return;
            router.push(`/${city.toLowerCase()}/${service.toLowerCase()}`);
          }}
        >
          Search
        </button>
      </div>
    </main>
  );
}
