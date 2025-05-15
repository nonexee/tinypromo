import Image from 'next/image';
import { Star } from 'lucide-react';

export default function ServiceCard({ provider }: { provider: any }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow-card hover:shadow-card-hover transition flex flex-col">
      {provider.photo && (
        <Image
          src={provider.photo}
          alt={provider.name}
          width={400}
          height={250}
          className="rounded-t"
          loading="lazy"
        />
      )}

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="font-semibold text-xl">{provider.name}</h2>

        {/* stars */}
        {provider.avg_rating > 0 && (
          <span className="flex items-center gap-1 text-amber-500 text-sm">
            <Star size={14} fill="currentColor" /> {provider.avg_rating.toFixed(1)}
          </span>
        )}

        <p className="text-gray-600 dark:text-gray-300 flex-1">{provider.tagline}</p>

        <a
          href={`https://wa.me/${provider.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="mt-auto bg-green-600 hover:bg-green-700 text-white text-center rounded py-2"
        >
          Message on WhatsApp
        </a>
      </div>
    </div>
  );
}
