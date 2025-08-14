
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, PlusCircle } from "lucide-react";
import { addProduct } from "./actions";
import { type ProductCategory } from "./page";
import { Textarea } from "@/components/ui/textarea";
import { generateProductDescription } from "@/ai/flows/generate-product-description";
import React, { useState } from "react";
import { AddCategoryDialog } from "./add-category-dialog";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

const formSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  hint: z.string().min(2, "Hint must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.string().min(1, "Price is required."),
  categoryId: z.string({
    required_error: "Please select a product category.",
  }),
  image: z
    .any()
    .refine((file) => file, "Product image is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png, .webp, and .gif files are accepted."
    ),
});

interface AddProductFormProps {
  categories: ProductCategory[];
  onProductAdded: () => void;
}

export function AddProductForm({ categories, onProductAdded }: AddProductFormProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hint: "",
      description: "",
      price: "On Enquiry",
    },
  });

  const { isSubmitting } = form.formState;

  const handleGenerateDescription = async () => {
    const productName = form.getValues("name");
    const categoryId = form.getValues("categoryId");
    if (!productName || !categoryId) {
      toast({
        title: "Missing Information",
        description: "Please enter a product name and select a category first.",
        variant: "destructive"
      });
      return;
    }
    const categoryName = categories.find(c => c.id === categoryId)?.name || "";

    setIsGenerating(true);
    try {
      const result = await generateProductDescription({ productName, categoryName });
      form.setValue("description", result.description, { shouldValidate: true });
      toast({
        title: "Description Generated!",
        description: "The AI-powered description has been added."
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate AI description.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("hint", values.hint);
    formData.append("description", values.description);
    formData.append("categoryId", values.categoryId);
    formData.append("price", values.price);
    formData.append("image", values.image);

    try {
      await addProduct(formData);
      toast({
        title: "Product Added",
        description: `${values.name} has been successfully added.`,
      });
      form.reset();
      const fileInput = document.getElementById('image-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      onProductAdded(); 
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    }
  }

  const handleCategoryChange = (value: string) => {
    if (value === 'add-new-category') {
      setIsAddCategoryOpen(true);
    } else {
        form.setValue("categoryId", value);
    }
  }
  
  const handleCategoryAdded = (newCategoryId: string) => {
    onProductAdded(); // This re-fetches all data
    setTimeout(() => { // Give it a moment to re-render with new categories
        form.setValue("categoryId", newCategoryId, { shouldValidate: true });
    }, 100);
  }

  return (
    <>
    <AddCategoryDialog 
        isOpen={isAddCategoryOpen} 
        onClose={() => setIsAddCategoryOpen(false)}
        onCategoryAdded={handleCategoryAdded}
    />
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Custom Lenticular Poster" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="hint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AI Hint</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., lenticular poster" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={handleCategoryChange} value={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                        {category.name}
                        </SelectItem>
                    ))}
                    <div className="my-1 border-t"></div>
                    <div 
                        className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        onSelect={(e) => e.preventDefault()} // Prevent closing
                        onClick={() => handleCategoryChange('add-new-category')}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create New Category
                        </div>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                    <Input placeholder="e.g., 500 or On Enquiry" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
                <div className="flex justify-between items-center">
                    <FormLabel>Product Description</FormLabel>
                    <Button type="button" size="sm" variant="ghost" onClick={handleGenerateDescription} disabled={isGenerating}>
                        {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Generate with AI
                    </Button>
                </div>
              <FormControl>
                <Textarea
                  placeholder="Describe the product in detail, or let AI generate it for you..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                    <Input 
                        id="image-input"
                        type="file" 
                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                        onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
                        {...rest}
                    />
                </FormControl>
                 <FormDescription>
                    Image must be a JPG, PNG, GIF, or WebP file under 5MB.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />

        <Button type="submit" disabled={isSubmitting || isGenerating}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Product...
            </>
          ) : (
            "Add Product"
          )}
        </Button>
      </form>
    </Form>
    </>
  );
}
