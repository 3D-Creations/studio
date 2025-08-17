
import Link from 'next/link';
import { Dna, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Logo } from '@/components/logo';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pharma-special', label: 'Pharma Special' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About Us' },
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
            <div className="mb-4 inline-block">
              <Logo />
            </div>
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
              <li>A/102, Ranjit Studio, Dadar (E), Mumbai-400014</li>
              <li><a href="mailto:varun@3dindia.co.in" className="hover:text-primary">varun@3dindia.co.in</a></li>
              <li><a href="tel:7666903710" className="hover:text-primary">Varun: 7666903710</a></li>
              <li>Tel: 022-24144014</li>
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
