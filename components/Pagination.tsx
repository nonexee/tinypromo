import Link from 'next/link';

export default function Pagination({
  page,
  hasMore,
}: {
  page: number;
  hasMore: boolean;
}) {
  return (
    <div className="flex justify-between mt-8">
      {page > 1 ? (
        <Link href={`/all?page=${page - 1}`} className="underline">
          ← Prev
        </Link>
      ) : <span />}

      {hasMore && (
        <Link href={`/all?page=${page + 1}`} className="underline">
          Next →
        </Link>
      )}
    </div>
  );
}
