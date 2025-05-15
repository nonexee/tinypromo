import Image from 'next/image';

export default function ServiceCard({ provider }: { provider: any }) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col gap-2">
      {provider.photo && (
        <Image
          src={provider.photo}
          alt={provider.name}
          width={400}
          height={250}
          className="rounded"
          loading="lazy"           /* native lazy-load */
        />
      )}
      <h2 className="font-semibold text-xl">{provider.name}</h2>
      <p className="text-gray-600">{provider.tagline}</p>
      <a
        href={`https://wa.me/${provider.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-white text-center rounded p-2 mt-auto"
      >
        Message on WhatsApp
      </a>
    </div>
  );
}
