
"use client"

import Link from 'next/link';
import { Menu, Dna, LogOut } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { useAuth } from '@/hooks/use-auth';

const navLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pharma-special', label: 'Pharma Special' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex-1 flex items-center justify-start">
          <div className="mr-6 flex items-center">
            <Logo />
          </div>
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="mb-6">
                  <Logo />
                </div>
                <div className="flex flex-col space-y-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {user && <Link href="/admin" className="text-lg transition-colors hover:text-primary">Admin</Link>}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <div className="flex-1 justify-center hidden md:flex">
          <nav className="flex items-center space-x-4 text-sm font-medium">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
             {user && <Link href="/admin" className="transition-colors hover:text-primary whitespace-nowrap">Admin</Link>}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
           {user ? (
            <Button size="sm" onClick={signOut} className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default" }),
                "hidden sm:inline-flex bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
              )}
            >
              Get a Quote
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
