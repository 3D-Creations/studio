import { Dna } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  href?: string;
}

export function Logo({ className, href = "/" }: LogoProps) {
  const logoContent = (
    <>
      <div className="p-2 bg-primary/10 rounded-lg">
        <Dna className="h-6 w-6 text-primary" />
      </div>
      <span className="text-xl font-bold tracking-tight font-headline">
        3D Creations
      </span>
    </>
  );

  const classes = cn("flex items-center gap-2", className);

  if (href) {
    return (
      <Link href={href} className={classes} aria-label="3D Creations Private Limited Home">
        {logoContent}
      </Link>
    );
  }

  return (
    <div className={classes}>
      {logoContent}
    </div>
  )
}
