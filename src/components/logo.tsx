import { Dna } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="3D Creations Hub Home">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Dna className="h-6 w-6 text-primary" />
      </div>
      <span className="text-xl font-bold tracking-tight font-headline">
        3D Creations Hub
      </span>
    </Link>
  );
}
