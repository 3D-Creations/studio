
"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
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
    }, 500); 
  };

  const hasMoreProducts = visibleProducts < products.length;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, visibleProducts).map((product, index) => (
          <Dialog key={product.id || index}>
            <DialogTrigger asChild>
              <Card className="flex flex-col overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
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
                <div className="flex flex-col flex-grow p-4">
                  <CardTitle className="font-headline text-lg">{product.name}</CardTitle>
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="font-headline text-3xl mb-2">{product.name}</DialogTitle>
                <DialogDescription>
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="aspect-square relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                        data-ai-hint={product.hint}
                      />
                    </div>
                    <div className="space-y-4">
                       <p className="text-base text-muted-foreground whitespace-pre-wrap">
                          {product.description || "No description available."}
                        </p>
                        <Link href="/contact" className={cn(
                          buttonVariants({ size: 'lg' }),
                          "w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
                        )}>
                          Inquire Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
