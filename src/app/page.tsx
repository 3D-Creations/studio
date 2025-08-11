
"use client"

import Image from 'next/image';
import Link from 'next/link';
import {
  Button,
  buttonVariants,
} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowRight, Gift, Layers, PackageCheck, FileText, Quote } from 'lucide-react';
import { SplinePlaceholder } from '@/components/spline-placeholder';
import { cn } from '@/lib/utils';
import Autoplay from "embla-carousel-autoplay"
import React from 'react';

const productCategories = [
  {
    icon: <Layers className="h-10 w-10" />,
    title: '3D Lenticular Prints',
    description: 'Vibrant, custom-designed prints that bring your visuals to life with depth and motion.',
  },
  {
    icon: <Gift className="h-10 w-10" />,
    title: 'Pharma & Corporate Gifts',
    description: 'Unique and memorable gifting solutions tailored for the pharmaceutical and corporate sectors.',
  },
  {
    icon: <FileText className="h-10 w-10" />,
    title: 'Customized Stationery',
    description: 'Premium stationery including diaries, notebooks, and chitpads with bespoke branding.',
  },
  {
    icon: <PackageCheck className="h-10 w-10" />,
    title: 'Custom Promotional Items',
    description: 'Innovative promotional products designed to make your marketing campaigns stand out.',
  },
];

const portfolioItems = [
  { src: 'https://images.unsplash.com/photo-1610747632338-9f63d0fa841b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bGVudGljdWxhciUyMHBvc3RlcnxlbnwwfHx8fDE3NTQ5MTY1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Lenticular Poster', hint: 'lenticular poster' },
  { src: 'https://images.unsplash.com/photo-1625552187662-ac3fac11fcf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxjb3Jwb3JhdGUlMjBnaWZ0fGVufDB8fHx8MTc1NDkxNjUwOXww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Custom Paperweight', hint: 'corporate gift' },
  { src: 'https://images.unsplash.com/photo-1625859767996-1606064a595b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjdXN0b20lMjBzdGF0aW9uZXJ5fGVufDB8fHx8MTc1NDkxNjUwOXww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Branded Notebook', hint: 'custom stationery' },
  { src: 'https://images.unsplash.com/photo-1590451340392-01a70fcd5b96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxwcm9tb3Rpb25hbCUyMGl0ZW18ZW58MHx8fHwxNzU0OTE2NTA5fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: '3D Coasters', hint: 'promotional item' },
  { src: 'https://images.unsplash.com/photo-1532153470116-e8c2088b8ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZGlhZ3JhbXxlbnwwfHx8fDE3NTQ5MTY1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Pharma Visual Aid', hint: 'medical diagram' },
  { src: 'https://images.unsplash.com/photo-1567688535100-5dc79f1ca57e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwcm9kdWN0JTIwYnJvY2h1cmV8ZW58MHx8fHwxNzU0OTE2NTA5fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Promotional Brochure', hint: 'product brochure' },
];

const clientLogos = [
  { src: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGxvZ298ZW58MHx8fHwxNzU0OTE2NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Pharma Client 1', hint: 'pharmaceutical logo' },
  { src: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx0ZWNoJTIwY29tcGFueXxlbnwwfHx8fDE3NTQ5MTY1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Corporate Client 2', hint: 'tech company' },
  { src: 'https://images.unsplash.com/photo-1636249253913-40e83d5423e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxoZWFsdGhjYXJlJTIwbG9nb3xlbnwwfHx8fDE3NTQ5MTY1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Pharma Client 3', hint: 'healthcare logo' },
  { src: 'https://images.unsplash.com/photo-1704918605018-6449befbc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjcmVhdGl2ZSUyMGFnZW5jeXxlbnwwfHx8fDE3NTQ5MTY1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Ad Agency 4', hint: 'creative agency' },
  { src: 'https://images.unsplash.com/photo-1596088359637-8d614753fb28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxiaW90ZWNoJTIwbG9nb3xlbnwwfHx8fDE3NTQ5MTY1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Pharma Client 5', hint: 'biotech logo' },
];

const testimonials = [
  {
    quote: "The 3D lenticular prints from 3D Creations are simply stunning. They took our campaign visuals to a whole new level.",
    author: 'Marketing Head',
    company: 'Global Pharma Inc.',
  },
  {
    quote: "Incredible quality and service. Their custom gifting solutions for our conference were a massive hit.",
    author: 'Event Coordinator',
    company: 'Creative Solutions Agency',
  },
  {
    quote: "Their specialization in pharma is evident. They understand our needs and deliver exceptional products every time.",
    author: 'Procurement Manager',
    company: 'Apex Pharmaceuticals',
  },
];


export default function Home() {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  const testimonialsAutoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full py-32 md:py-48 flex items-center justify-center text-center overflow-hidden">
        <SplinePlaceholder />
        <div className="container px-4 md:px-6 z-10">
          <p className="mb-2 text-lg font-semibold text-primary">3D Creations Private Limited</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-headline text-balance text-black dark:text-white">
            Innovation in Every Dimension
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 text-balance">
            Your premium partner for 3D lenticular printing and specialized pharma gifting solutions.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products" className={cn(buttonVariants({ size: 'lg' }), "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity")}>
              Explore Products
            </Link>
            <Link href="/contact" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
              Get a Quote <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section id="products" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Capabilities</h2>
            <p className="text-lg text-muted-foreground mt-2">From print to promotion, we deliver excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productCategories.map((category) => (
              <Card key={category.title} className="text-center flex flex-col items-center p-6 border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="p-4 bg-primary/10 rounded-full text-primary mb-4">
                  {category.icon}
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="font-headline text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-2">
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works Carousel */}
      <section id="portfolio" className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Works</h2>
            <p className="text-lg text-muted-foreground mt-2">A glimpse into our innovative solutions.</p>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[autoplayPlugin.current]}
            onMouseEnter={autoplayPlugin.current.stop}
            onMouseLeave={autoplayPlugin.current.reset}
            className="w-full"
          >
            <CarouselContent>
              {portfolioItems.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover aspect-[3/2] transition-transform duration-500 hover:scale-105"
                          data-ai-hint={item.hint}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      
      {/* Client Logos */}
      <section id="clients" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl font-bold font-headline text-muted-foreground mb-10">
            Trusted by Industry Leaders
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {clientLogos.map((logo, index) => (
              <Image
                key={index}
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={50}
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                data-ai-hint={logo.hint}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">What Our Clients Say</h2>
          </div>
          <Carousel
            className="w-full max-w-4xl mx-auto"
            opts={{ loop: true }}
            plugins={[testimonialsAutoplayPlugin.current]}
            onMouseEnter={testimonialsAutoplayPlugin.current.stop}
            onMouseLeave={testimonialsAutoplayPlugin.current.reset}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="bg-transparent border-0 shadow-none">
                      <CardContent className="flex flex-col items-center text-center p-6">
                        <Quote className="w-10 h-10 text-primary mb-4" />
                        <p className="text-lg md:text-xl text-foreground mb-4 text-balance">
                          "{testimonial.quote}"
                        </p>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact-cta" className="w-full py-20 md:py-32 bg-background">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Let's collaborate to create something extraordinary. Contact us today for a personalized quote.
          </p>
          <Link href="/contact" className={cn(buttonVariants({ size: 'lg' }), "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity")}>
            Contact Us Now <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
