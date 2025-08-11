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
import { productCategories } from '@/lib/products';
import { ProductGrid } from '@/components/product-grid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata = {
  title: 'Products & Solutions',
  description: 'Explore our wide range of 3D lenticular prints, corporate gifts, custom stationery, and promotional items.',
};


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

      <div className="container pb-16 md:pb-24">
        <Tabs defaultValue={productCategories[0].id} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-10 h-auto">
            {productCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="py-3 text-base">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {productCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
               <div className="mb-10 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">{category.name}</h2>
                  <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto md:mx-0">{category.description}</p>
                </div>
              <ProductGrid products={category.products} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
