
"use client"

import { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription as DialogDescriptionPrimitive, // Renamed to avoid conflict
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
      <Dialog open={!!selectedProduct} onOpenChange={(isOpen) => !isOpen && setSelectedProduct(null)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, visibleProducts).map((product, index) => (
            <Card 
              key={product.id || index}
              className="flex flex-col overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div 
                className="aspect-square w-full relative cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  data-ai-hint={product.hint}
                />
              </div>
              <div className="flex flex-col flex-grow p-4 pt-0">
                <CardTitle 
                    className="font-headline text-lg flex-grow cursor-pointer hover:underline"
                    onClick={() => setSelectedProduct(product)}
                >
                    {product.name}
                </CardTitle>
                {product.price && (
                    <p className="text-sm font-semibold text-primary mt-1">{product.price}</p>
                )}
                {product.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                        {product.description}
                    </p>
                )}
              </div>
              <CardFooter className="p-4 pt-0 mt-auto">
                  <Button size="sm" className="w-full" onClick={() => setSelectedProduct(product)}>
                      View Details
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <DialogContent className="max-w-3xl">
          {selectedProduct && (
            <DialogHeader>
               <DialogTitle className="font-headline text-3xl mb-4">{selectedProduct.name}</DialogTitle>
              <DialogDescriptionPrimitive>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="aspect-square relative">
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      className="object-contain rounded-lg"
                      data-ai-hint={selectedProduct.hint}
                    />
                  </div>
                  <div className="space-y-4">
                     <div className="space-y-2 text-lg">
                        <p><span className="font-semibold text-foreground">Name:</span> {selectedProduct.name}</p>
                        {selectedProduct.price && (
                            <p><span className="font-semibold text-foreground">Price:</span> {selectedProduct.price}</p>
                        )}
                    </div>

                     <p className="text-base text-muted-foreground whitespace-pre-wrap pt-4 border-t">
                        {selectedProduct.description || "No description available."}
                      </p>
                      
                      <Link href="/contact" className={cn(
                        buttonVariants({ size: 'lg' }),
                        "w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity !mt-6"
                      )}>
                        Inquire Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                  </div>
                </div>
              </DialogDescriptionPrimitive>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>

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
