
"use client";

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
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

export interface Product {
  id: string;
  name: string;
  image: string;
  hint: string;
  description?: string;
  price?: string;
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
    switch (sortOption) {
      case 'az':
        return [...products].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      case 'za':
        return [...products].sort((a, b) => (b.name || '').localeCompare(a.name || ''));
      default:
        return products;
    }
  }
  
  const filteredCategories = categories
    .map(category => ({
      ...category,
      products: sortProducts(category.products.filter(product =>
        product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )),
    }))
    .filter(category => category.products.length > 0)
    .filter(category => selectedCategory === 'all' || category.id === selectedCategory);
    
  const allFilteredProducts = sortProducts(
    categories.flatMap(category => category.products)
      .filter(product => product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );


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

                <DropdownMenuLabel>Sort by Name</DropdownMenuLabel>
                 <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
                  <DropdownMenuRadioItem value="default">Default</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="az">A-Z</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="za">Z-A</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div className="space-y-16">
          {isSearching ? (
             <>
               {allFilteredProducts.length > 0 ? (
                  <div>
                      <h2 className="text-3xl md:text-4xl font-bold font-headline mb-10 text-center md:text-left">
                        Search Results for "{searchQuery}"
                      </h2>
                      <ProductGrid products={allFilteredProducts} />
                  </div>
               ) : (
                  <div className="text-center py-16">
                      <p className="text-lg text-muted-foreground">No products found for "{searchQuery}".</p>
                  </div>
               )}
             </>
          ) : (
             <>
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
