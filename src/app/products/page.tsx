
"use client";

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { SplinePlaceholder } from '@/components/spline-placeholder';
import { productCategories, type ProductCategory } from '@/lib/products';
import { ProductGrid } from '@/components/product-grid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(productCategories[0].id);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  }

  const filteredCategories = productCategories.map(category => ({
    ...category,
    products: category.products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.products.length > 0);

  const isSearching = searchQuery.length > 0;

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
            <Button variant="outline" className="flex-shrink-0">
                <Filter className="mr-2 h-5 w-5" />
                Filters
            </Button>
        </div>

        {isSearching ? (
           <div className="space-y-12">
             {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                    <div key={category.id}>
                        <div className="mb-10 text-center md:text-left">
                          <h2 className="text-3xl md:text-4xl font-bold font-headline">{category.name}</h2>
                          <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto md:mx-0">{category.description}</p>
                        </div>
                        <ProductGrid products={category.products} />
                    </div>
                ))
             ) : (
                <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">No products found for "{searchQuery}".</p>
                </div>
             )}
           </div>
        ) : (
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-10 h-auto">
                {productCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="py-3 text-base">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {productCategories.map((category) => (
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
      </div>
    </div>
  );
}
