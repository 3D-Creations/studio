
"use client";

import { useState, useEffect } from "react";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { AddProductForm } from "./add-product-form";
import { EditProductDialog } from "./edit-product-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddCategoryDialog } from "./add-category-dialog";


export interface Product {
  id: string;
  name: string;
  image: string;
  hint: string;
  description?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

async function getProductData(): Promise<ProductCategory[]> {
    try {
        const categoriesCollection = collection(db, "productCategories");
        const q = query(categoriesCollection);
        const categoriesSnapshot = await getDocs(q);

        const categories = await Promise.all(
        categoriesSnapshot.docs.map(async (categoryDoc) => {
            const categoryData = categoryDoc.data();
            const productsCollection = collection(categoryDoc.ref, "products");
            const productsSnapshot = await getDocs(productsCollection);

            const products = productsSnapshot.docs.map((prodDoc) => {
            const productData = prodDoc.data();
            return {
                id: prodDoc.id,
                name: productData.name,
                image: productData.image,
                hint: productData.hint,
                description: productData.description,
            };
            });

            return {
            id: categoryDoc.id,
            name: categoryData.name,
            description: categoryData.description,
            products: products.sort((a,b) => a.name.localeCompare(b.name)),
            };
        })
        );
        return categories.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error("Error fetching product data from Firestore:", error);
        throw error;
    }
}


export default function ManageProductsPage() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0); 
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<{product: Product, categoryId: string} | null>(null);

  const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProductData();
        setCategories(data);
        setKey(prevKey => prevKey + 1); 
      } catch (error) {
        console.error("Failed to load product categories.", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDataChange = () => {
    fetchData(); 
  }

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Manage Products</PageHeaderHeading>
        <PageHeaderDescription>
          Add, edit, and manage products and categories.
        </PageHeaderDescription>
      </PageHeader>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Existing Products</CardTitle>
                    <CardDescription>View and manage products currently listed on your products page.</CardDescription>
                </div>
                 <AddCategoryDialog onCategoryAdded={handleDataChange}>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Category
                    </Button>
                </AddCategoryDialog>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                ) : categories.length > 0 ? (
                    <Accordion type="multiple" className="w-full" defaultValue={categories.map(c => c.id)}>
                        {categories.map(category => (
                            <AccordionItem key={category.id} value={category.id}>
                                <AccordionTrigger className="text-lg font-semibold">{category.name} ({category.products.length})</AccordionTrigger>
                                <AccordionContent>
                                    {category.products.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-4">
                                        {category.products.map(product => (
                                            <div key={product.id} className="relative group cursor-pointer" onClick={() => setEditingProduct({product, categoryId: category.id})}>
                                                <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                                                    <CardContent className="p-0">
                                                        {product.image ? (
                                                          <Image
                                                              src={product.image}
                                                              alt={product.name}
                                                              width={200}
                                                              height={200}
                                                              className="w-full h-auto object-cover aspect-square rounded-t-lg"
                                                              data-ai-hint={product.hint}
                                                          />
                                                        ) : (
                                                          <div className="w-full h-auto object-cover aspect-square rounded-t-lg bg-muted flex items-center justify-center">
                                                              <span className="text-xs text-muted-foreground">No Image</span>
                                                          </div>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                                <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                                    <p className="text-white font-semibold">Edit</p>
                                                </div>
                                                <p className="text-sm font-medium mt-2 text-center truncate">{product.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                    ) : (
                                        <p className="text-muted-foreground text-center py-4">No products in this category yet.</p>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <p className="text-muted-foreground text-center py-8">No product categories found. Create one to get started.</p>
                )}
            </CardContent>
           </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>
                Upload a new product to display on your public products page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <AddProductForm key={key} categories={categories} onProductAdded={handleDataChange} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
       {editingProduct && (
        <EditProductDialog
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          product={editingProduct.product}
          categoryId={editingProduct.categoryId}
          onProductUpdated={handleDataChange}
        />
      )}
    </div>
  );
}
