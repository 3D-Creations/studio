
"use client";

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { ProductGrid } from '@/components/product-grid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  name: string;
  image: string;
  hint: string;
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
  const [activeTab, setActiveTab] = useState(categories.length > 0 ? categories[0].id : '');
  const [sortOption, setSortOption] = useState('default');

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

  const filteredCategories = categories.map(category => ({
    ...category,
    products: sortProducts(category.products.filter(product =>
      product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )),
  })).filter(category => category.products.length > 0);

  const allFilteredProducts = sortProducts(
    categories.flatMap(category => category.products)
      .filter(product => product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const isSearching = searchQuery.length > 0;

  return (
    <>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search all products..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {isSearching && (
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={clearSearch}>
                    <X className="h-5 w-5 text-muted-foreground" />
                  </Button>
                )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-shrink-0">
                    <Filter className="mr-2 h-5 w-5" />
                    Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
                  <DropdownMenuRadioItem value="default">Default</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="az">A-Z</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="za">Z-A</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>

        {isSearching ? (
           <div className="space-y-12">
             {allFilteredProducts.length > 0 ? (
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-10 text-center md:text-left">Search Results</h2>
                    <ProductGrid products={allFilteredProducts} />
                </div>
             ) : (
                <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">No products found for "{searchQuery}".</p>
                </div>
             )}
           </div>
        ) : (
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-10 h-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="py-3 text-base">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {filteredCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                   <div className="mb-10 text-center md:text-left">
                      <h2 className="text-3xl md:text-4xl font-bold font-headline">{category.name}</h2>
                      <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto md:mx-0">{category.description}</p>
                    </div>
                  <ProductGrid products={category.products} />
                </TabsContent>
              ))}
            </Tabs>
        )}
    </>
  );
}
