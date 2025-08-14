
import { SplinePlaceholder } from '@/components/spline-placeholder';
import { ProductsClient, type ProductCategory } from '@/components/products-client';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const metadata = {
  title: 'Our Products',
  description: 'Discover our comprehensive range of innovative products, meticulously crafted to meet your branding and promotional needs.',
};

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
             return {
                name: productData.name,
                image: productData.image,
                hint: productData.hint,
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
    // Return empty array on error to prevent build failure. Page will show a message.
    return [];
  }
}


export default async function ProductsPage() {
  const productCategories = await getProductData();

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
        {productCategories.length > 0 ? (
            <ProductsClient initialCategories={productCategories} />
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
