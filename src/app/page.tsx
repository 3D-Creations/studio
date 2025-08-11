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
  { src: 'https://placehold.co/600x400.png', alt: 'Lenticular Poster', hint: 'lenticular poster' },
  { src: 'https://placehold.co/600x400.png', alt: 'Custom Paperweight', hint: 'corporate gift' },
  { src: 'https://placehold.co/600x400.png', alt: 'Branded Notebook', hint: 'custom stationery' },
  { src: 'https://placehold.co/600x400.png', alt: '3D Coasters', hint: 'promotional item' },
  { src: 'https://placehold.co/600x400.png', alt: 'Pharma Visual Aid', hint: 'medical diagram' },
  { src: 'https://placehold.co/600x400.png', alt: 'Promotional Brochure', hint: 'product brochure' },
];

const clientLogos = [
  { src: 'https://placehold.co/150x50.png', alt: 'Pharma Client 1', hint: 'pharmaceutical logo' },
  { src: 'https://placehold.co/150x50.png', alt: 'Corporate Client 2', hint: 'tech company' },
  { src: 'https://placehold.co/150x50.png', alt: 'Pharma Client 3', hint: 'healthcare logo' },
  { src: 'https://placehold.co/150x50.png', alt: 'Ad Agency 4', hint: 'creative agency' },
  { src: 'https://placehold.co/150x50.png', alt: 'Pharma Client 5', hint: 'biotech logo' },
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
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full py-32 md:py-48 flex items-center justify-center text-center overflow-hidden">
        <SplinePlaceholder />
        <div className="container px-4 md:px-6 z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-headline text-balance bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
            Innovation in Every Dimension
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 text-balance">
            3D Creations Private Limited: Your premium partner for 3D lenticular printing and specialized pharma gifting solutions.
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
