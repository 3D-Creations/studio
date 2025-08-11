import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { SplinePlaceholder } from '@/components/spline-placeholder';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Products & Solutions',
  description: 'Explore our wide range of 3D lenticular prints, corporate gifts, custom stationery, and promotional items.',
};

const productCategories = [
  {
    name: '3D Lenticular Prints',
    description: 'Captivating prints with unparalleled depth and motion effects. Perfect for posters, packaging, and promotional materials.',
    products: [
      { name: 'Custom Posters', image: 'https://placehold.co/400x300.png', hint: 'lenticular poster' },
      { name: 'Business Cards', image: 'https://placehold.co/400x300.png', hint: 'business cards' },
      { name: 'Product Labels', image: 'https://placehold.co/400x300.png', hint: 'product label' },
      { name: 'Large Format Displays', image: 'https://placehold.co/400x300.png', hint: 'large display' },
    ],
  },
  {
    name: 'Pharma & Corporate Gifts',
    description: 'High-impact, memorable gifts designed to strengthen your brand presence in the pharmaceutical and corporate sectors.',
    products: [
      { name: '3D Paperweights', image: 'https://placehold.co/400x300.png', hint: 'crystal paperweight' },
      { name: 'Anatomical Models', image: 'https://placehold.co/400x300.png', hint: 'anatomical model' },
      { name: 'Custom Pen Stands', image: 'https://placehold.co/400x300.png', hint: 'desk organizer' },
      { name: 'Executive Gift Sets', image: 'https://placehold.co/400x300.png', hint: 'luxury gift' },
    ],
  },
  {
    name: 'Customized Stationery',
    description: 'Elevate your brand with our premium range of fully customizable stationery items.',
    products: [
      { name: 'Diaries & Notebooks', image: 'https://placehold.co/400x300.png', hint: 'leather notebook' },
      { name: 'Chit Pads & Memo Blocks', image: 'https://placehold.co/400x300.png', hint: 'memo pads' },
      { name: 'Letterheads & Envelopes', image: 'https://placehold.co/400x300.png', hint: 'stationery set' },
      { name: 'Presentation Folders', image: 'https://placehold.co/400x300.png', hint: 'document folder' },
    ],
  },
];

export default function ProductsPage() {
  return (
    <div className="relative overflow-hidden">
      <SplinePlaceholder />

      <section className="py-24 md:py-32 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-balance">
            Our Products & Solutions
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground text-balance">
            Discover our comprehensive range of innovative products, meticulously crafted to meet your branding and promotional needs.
          </p>
        </div>
      </section>

      <div className="container pb-16 md:pb-24 space-y-16">
        {productCategories.map((category) => (
          <section key={category.name}>
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">{category.name}</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-3xl">{category.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {category.products.map((product) => (
                <Card key={product.name} className="flex flex-col overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <CardContent className="p-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                      data-ai-hint={product.hint}
                    />
                  </CardContent>
                  <div className="flex flex-col flex-grow">
                    <CardHeader>
                      <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
                    </CardHeader>
                    <CardFooter className="mt-auto">
                      <Link href="/contact" className={cn(
                        buttonVariants({ variant: 'outline', size: 'sm' }),
                        "w-full"
                      )}>
                        Inquire Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
