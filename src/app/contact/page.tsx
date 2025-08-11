import { ContactForm } from '@/components/contact-form';
import { SplinePlaceholder } from '@/components/spline-placeholder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with 3D Creations for inquiries, quotes, or collaborations. We are available via form, email, phone, and WhatsApp.',
};

const contactDetails = [
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: 'Our Office',
    value: '123 Innovation Drive, Mumbai, IN 400001',
  },
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    title: 'Email Us',
    value: 'contact@3dcreations.dev',
    href: 'mailto:contact@3dcreations.dev',
  },
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    title: 'Call Us',
    value: '+91 123 456 7890',
    href: 'tel:+911234567890',
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    title: 'WhatsApp',
    value: 'Chat with us',
    href: 'https://wa.me/911234567890',
  },
];

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <SplinePlaceholder />
      <section className="py-24 md:py-32 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-balance">
            Get In Touch
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground text-balance">
            We're here to help you with any questions or project ideas. Reach out and let's start creating together.
          </p>
        </div>
      </section>

      <section className="container pb-16 md:pb-24">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 md:p-8 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactDetails.map((detail) => (
                  <div key={detail.title} className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">{detail.icon}</div>
                    <div>
                      <h4 className="font-semibold">{detail.title}</h4>
                      {detail.href ? (
                        <a href={detail.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{detail.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
             <div className="aspect-video bg-muted rounded-lg shadow-lg">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.71833779532!2d72.88560941540307!3d19.07609038708688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1628682173154!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    className="rounded-lg"
                    title="Google Map of Mumbai"
                ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
