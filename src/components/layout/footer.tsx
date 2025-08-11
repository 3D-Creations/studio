import Link from 'next/link';
import { Dna, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Logo } from '@/components/logo';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: '#', icon: <Twitter className="h-5 w-5" /> },
  { href: '#', icon: <Facebook className="h-5 w-5" /> },
  { href: '#', icon: <Linkedin className="h-5 w-5" /> },
  { href: '#', icon: <Instagram className="h-5 w-5" /> },
];

export function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground">
              Innovating in every dimension with premium 3D printing and gifting solutions.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Innovation Drive, Mumbai, IN</li>
              <li><a href="mailto:contact@3dcreations.dev" className="hover:text-primary">contact@3dcreations.dev</a></li>
              <li><a href="tel:+911234567890" className="hover:text-primary">+91 123 456 7890</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} 3D Creations Private Limited. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
