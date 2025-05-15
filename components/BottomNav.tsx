import Link from 'next/link';
import { Search, List, Plus } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-gray-800 shadow-t flex justify-around py-2 z-40">
      <Link href="/" aria-label="Search"><Search /></Link>
      <Link href="/all" aria-label="Browse"><List /></Link>
      <Link href="/add" aria-label="Add"><Plus /></Link>
    </nav>
  );
}
