import Link from 'next/link';

export default function Breadcrumb({
  city,
  service,
}: {
  city: string;
  service: string;
}) {
  return (
    <p className="text-sm text-gray-500 mb-4">
      <Link href="/" className="underline">
        Home
      </Link>{' '}
      ›{' '}
      <Link href={`/${city}`} className="underline capitalize">
        {city}
      </Link>{' '}
      › <span className="capitalize">{service}</span>
    </p>
  );
}
