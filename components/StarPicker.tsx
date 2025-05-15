import { Star } from 'lucide-react';
import { useState } from 'react';

export default function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={24}
          className={`${(hover ?? value) >= n ? 'text-amber-400' : 'text-gray-300'} cursor-pointer`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(null)}
          onClick={() => onChange(n)}
          fill={(hover ?? value) >= n ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
}
