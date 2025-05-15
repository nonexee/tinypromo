import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import StarPicker from '@/components/StarPicker';

export default function ReviewModal({
  providerId,
  onClose,
}: {
  providerId: string;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!comment.trim()) return alert('Please add a comment.');
    setLoading(true);
    const { error } = await supabase.from('reviews').insert([
      { provider_id: providerId, rating, comment },
    ]);
    setLoading(false);
    if (error) return alert(error.message);
    alert('Thanks for your review!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X size={18} />
        </button>
        <h3 className="text-lg font-semibold mb-4">Leave a review</h3>

        <StarPicker value={rating} onChange={setRating} />

        <textarea
          className="border rounded w-full h-28 p-2 mt-4 dark:bg-gray-800 dark:border-gray-700"
          placeholder="Share your experience…"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-brand text-white rounded w-full"
        >
          {loading ? 'Submitting…' : 'Submit review'}
        </button>
      </div>
    </div>
  );
}
