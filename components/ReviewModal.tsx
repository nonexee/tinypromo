import { X } from 'lucide-react';

export default function ReviewModal({
  providerId,
  onClose,
}: {
  providerId: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X size={18} />
        </button>
        <h3 className="text-lg font-semibold mb-4">Add a review</h3>
        <p className="text-sm mb-6 opacity-75">
          (Review form coming soon – stub component to unblock build.)
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-brand text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
