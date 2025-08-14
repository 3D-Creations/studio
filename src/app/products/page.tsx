
"use client";

import { useState, useEffect } from 'react';
import { SplinePlaceholder } from '@/components/spline-placeholder';
import { ProductsClient, type ProductCategory, type ProductMedia } from '@/components/products-client';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

async function getProductData(): Promise<ProductCategory[]> {
  try {
    const categoriesCollection = collection(db, 'productCategories');
    const q = query(categoriesCollection, orderBy('name'));
    const categoriesSnapshot = await getDocs(q);

    const categories = await Promise.all(
      categoriesSnapshot.docs.map(async (categoryDoc) => {
        const categoryData = categoryDoc.data();
        const productsCollection = collection(categoryDoc.ref, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        
        const products = productsSnapshot.docs.map(prodDoc => {
             const productData = prodDoc.data();
             // This handles both the old `image` field and the new `media` array
             let media: ProductMedia[] = [];
             if (productData.media && Array.isArray(productData.media)) {
                 media = productData.media;
             } else if (productData.image) {
                 media = [{ url: productData.image, type: 'image' }];
             }

             return {
                id: prodDoc.id,
                name: productData.name,
                media: media,
                hint: productData.hint,
                description: productData.description || '',
                price: productData.price || 'On Enquiry',
             }
        });

        return {
          id: categoryDoc.id,
          name: categoryData.name,
          description: categoryData.description,
          products: products,
        };
      })
    );
    return categories;
  } catch (error) {
    console.error("Error fetching product data from Firestore:", error);
    if (error instanceof Error && 'code' in error && (error as any).code === 'permission-denied') {
        console.error("Firestore permission denied. Please check your security rules and indexes in the Firebase console.");
    }
    return [];
  }
}

export default function ProductsPage() {
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getProductData();
      setProductCategories(data);
      setLoading(false);
    }
    fetchData();
  }, []);

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
        {loading ? (
            <div className="space-y-12">
                <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-2 mb-10 h-auto">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-6 w-2/3" />
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                    <Skeleton className="h-80 w-full" />
                    <Skeleton className="h-80 w-full" />
                    <Skeleton className="h-80 w-full" />
                    <Skeleton className="h-80 w-full" />
                </div>
            </div>
        ) : productCategories.length > 0 ? (
            <ProductsClient categories={productCategories} />
        ) : (
            <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">Could not load products.</p>
                <p className="text-sm text-muted-foreground mt-2">Please ensure the 'productCategories' collection exists in Firestore and has the correct permissions.</p>
            </div>
        )}
      </div>
    </div>
  );
}
