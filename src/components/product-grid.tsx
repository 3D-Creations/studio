
"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Loader2 } from 'lucide-react';
import { type Product } from '@/components/products-client';
import { cn } from '@/lib/utils';

const PRODUCTS_PER_PAGE = 8;

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [visibleProducts, setVisibleProducts] = useState(PRODUCTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreProducts = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleProducts((prev) => prev + PRODUCTS_PER_PAGE);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const hasMoreProducts = visibleProducts < products.length;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, visibleProducts).map((product, index) => (
          <Card key={index} className="flex flex-col overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
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

      {hasMoreProducts && (
        <div className="text-center mt-12">
          <Button onClick={loadMoreProducts} disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More Products'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
