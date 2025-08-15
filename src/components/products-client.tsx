
"use client";

import { useState, useMemo } from 'react';
import { Search, Filter, X, Sparkles } from 'lucide-react';
import { ProductGrid } from '@/components/product-grid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface ProductMedia {
  url: string;
  type: 'image' | 'video';
}

export interface Product {
  id: string;
  name: string;
  media: ProductMedia[];
  hint: string;
  description?: string;
  price?: string;
  size?: string;
  isFeatured?: boolean;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

interface ProductsClientProps {
    categories: ProductCategory[];
}

export function ProductsClient({ categories }: ProductsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  }

  const sortProducts = (products: Product[]) => {
    let sortedProducts = [...products];
    switch (sortOption) {
      case 'az':
        sortedProducts.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'za':
        sortedProducts.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        break;
      case 'newest':
        sortedProducts.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        break;
      default:
        // Default sort might be by name or whatever Firestore gives
        sortedProducts.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
    }
    return sortedProducts;
  }
  
  const allProducts = useMemo(() => categories.flatMap(c => c.products), [categories]);

  const featuredProducts = useMemo(() => 
    sortProducts(allProducts.filter(p => p.isFeatured))
  , [allProducts, sortOption]);

  const filteredCategories = useMemo(() => {
    const regularProducts = allProducts.filter(p => !p.isFeatured);
    
    const productsToFilter = (selectedCategory === 'all' 
      ? regularProducts 
      : regularProducts.filter(p => categories.find(c => c.products.some(cp => cp.id === p.id))?.id === selectedCategory)
    ).filter(p => p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const sorted = sortProducts(productsToFilter);

    if (selectedCategory !== 'all') {
        const cat = categories.find(c => c.id === selectedCategory);
        return cat ? [{ ...cat, products: sorted }] : [];
    }

    // Group by category again if 'all' is selected
    const grouped = sorted.reduce((acc, product) => {
        const category = categories.find(cat => cat.products.some(p => p.id === product.id));
        if (category) {
            if (!acc[category.id]) {
                acc[category.id] = { ...category, products: [] };
            }
            acc[category.id].products.push(product);
        }
        return acc;
    }, {} as Record<string, ProductCategory>);

    return Object.values(grouped);
  }, [searchQuery, sortOption, selectedCategory, categories, allProducts]);
    
  const allFilteredProductsForSearch = useMemo(() => 
    sortProducts(allProducts.filter(product => product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())))
  , [allProducts, searchQuery, sortOption]);


  const isSearching = searchQuery.length > 0;

  return (
    <>
        <div className="flex flex-col md:flex-row gap-4 mb-8 md:mb-12">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search all products..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={clearSearch}>
                    <X className="h-5 w-5 text-muted-foreground" />
                  </Button>
                )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-shrink-0">
                    <Filter className="mr-2 h-5 w-5" />
                    Filter & Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                  <DropdownMenuRadioItem value="all">All Categories</DropdownMenuRadioItem>
                  {categories.map(category => (
                     <DropdownMenuRadioItem key={category.id} value={category.id}>{category.name}</DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                 <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
                  <DropdownMenuRadioItem value="default">Default</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="az">Name: A-Z</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="za">Name: Z-A</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div className="space-y-16">
          {isSearching ? (
             <>
               {allFilteredProductsForSearch.length > 0 ? (
                  <div>
                      <h2 className="text-3xl md:text-4xl font-bold font-headline mb-10 text-center md:text-left">
                        Search Results for "{searchQuery}"
                      </h2>
                      <ProductGrid products={allFilteredProductsForSearch} />
                  </div>
               ) : (
                  <div className="text-center py-16">
                      <p className="text-lg text-muted-foreground">No products found for "{searchQuery}".</p>
                  </div>
               )}
             </>
          ) : (
             <>
              {featuredProducts.length > 0 && selectedCategory === 'all' && (
                <section>
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline flex items-center gap-3 justify-center md:justify-start">
                            <Sparkles className="h-8 w-8 text-accent" />
                            Featured Products
                        </h2>
                        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto md:mx-0">Our curated selection of top products.</p>
                    </div>
                    <ProductGrid products={featuredProducts} />
                </section>
              )}

              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                    <section key={category.id}>
                        <div className="mb-10 text-center md:text-left">
                          <h2 className="text-3xl md:text-4xl font-bold font-headline">{category.name}</h2>
                          <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto md:mx-0">{category.description}</p>
                        </div>
                      <ProductGrid products={category.products} />
                    </section>
                ))
              ) : (
                 <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">No products found for the selected filter.</p>
                </div>
              )}
             </>
          )}
        </div>
    </>
  );
}
