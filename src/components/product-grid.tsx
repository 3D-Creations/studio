
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription as DialogDescriptionPrimitive,
} from '@/components/ui/dialog';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowRight, Loader2, Video, FileImage, Sparkles } from 'lucide-react';
import { type Product } from '@/components/products-client';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

const PRODUCTS_PER_PAGE = 10;

// Helper to check if a product is new
const isNew = (createdAt?: { seconds: number; nanoseconds: number }) => {
  if (!createdAt) return false;
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const productDate = new Date(createdAt.seconds * 1000);
  return productDate > twoWeeksAgo;
};


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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.slice(0, visibleProducts).map((product, index) => (
            <Card 
              key={product.id || index}
              className="flex flex-col overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              <div 
                className="aspect-square w-full relative cursor-pointer bg-secondary/30 rounded-t-lg"
                onClick={() => setSelectedProduct(product)}
              >
                {(product.media && product.media.length > 0) ? (
                    product.media[0].type === 'image' ? (
                        <Image
                            src={product.media[0].url}
                            alt={product.name}
                            fill
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={product.hint}
                        />
                    ) : (
                         <div className="w-full h-full bg-black rounded-t-lg flex items-center justify-center">
                            <Video className="h-10 w-10 text-white" />
                         </div>
                    )
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <FileImage className="h-10 w-10 text-muted-foreground" />
                    </div>
                )}
                {isNew(product.createdAt) && (
                    <Badge variant="default" className="absolute top-2 left-2 bg-gradient-to-r from-accent to-primary">
                        New Arrival
                    </Badge>
                )}
                {product.isFeatured && (
                     <Badge variant="secondary" className="absolute top-2 right-2">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Featured
                    </Badge>
                )}
              </div>
              <div className="flex flex-col flex-grow p-3">
                 <div className="flex-grow">
                    <p 
                        className="font-medium text-foreground cursor-pointer hover:underline text-sm"
                        onClick={() => setSelectedProduct(product)}
                    >
                        <span className="font-semibold">Name:</span> {product.name}
                    </p>
                    {product.price && (
                        <p className="text-xs mt-1"><span className="font-semibold">Price:</span> {product.price}</p>
                    )}
                    {product.description && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                            {product.description}
                        </p>
                    )}
                 </div>
              </div>
              <CardFooter className="p-3 pt-0 mt-auto">
                  <Button 
                    size="sm" 
                    className="w-full h-8 text-xs bg-gradient-to-r from-primary/80 to-accent/80 text-primary-foreground hover:opacity-90 transition-opacity" 
                    onClick={() => setSelectedProduct(product)}
                  >
                      Inquire Now
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
                    <Carousel className="w-full">
                        <CarouselContent>
                            {(selectedProduct.media && selectedProduct.media.length > 0) ? (
                                selectedProduct.media.map((media, index) => (
                                    <CarouselItem key={index}>
                                        <div className="aspect-square relative bg-secondary/30 rounded-lg">
                                            {media.type === 'image' ? (
                                                <Image
                                                    src={media.url}
                                                    alt={`${selectedProduct.name} - media ${index + 1}`}
                                                    fill
                                                    className="object-contain rounded-lg p-4"
                                                />
                                            ) : (
                                                <video
                                                    src={media.url}
                                                    controls
                                                    className="w-full h-full object-contain rounded-lg"
                                                />
                                            )}
                                        </div>
                                    </CarouselItem>
                                ))
                            ) : (
                                <CarouselItem>
                                     <div className="aspect-square relative bg-secondary/30 rounded-lg flex items-center justify-center">
                                        <FileImage className="h-20 w-20 text-muted-foreground" />
                                    </div>
                                </CarouselItem>
                            )}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                  <div className="space-y-4">
                     <div className="space-y-2 text-lg">
                        <p><span className="font-semibold text-foreground">Name:</span> {selectedProduct.name}</p>
                        {selectedProduct.price && (
                            <p><span className="font-semibold text-foreground">Price:</span> {selectedProduct.price}</p>
                        )}
                        {selectedProduct.size && (
                            <p><span className="font-semibold text-foreground">Size:</span> {selectedProduct.size}</p>
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
