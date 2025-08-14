
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
import { Loader2 } from "lucide-react";
import { addProduct } from "./actions";
import { type ProductCategory } from "./page";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  hint: z.string().min(2, "Hint must be at least 2 characters."),
  categoryId: z.string({
    required_error: "Please select a product category.",
  }),
  image: z
    .any()
    .refine((file) => file, "Product image is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

interface AddProductFormProps {
  categories: ProductCategory[];
}

export function AddProductForm({ categories }: AddProductFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hint: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("hint", values.hint);
    formData.append("categoryId", values.categoryId);
    formData.append("image", values.image);

    try {
      await addProduct(formData);
      toast({
        title: "Product Added",
        description: `${values.name} has been successfully added.`,
      });
      form.reset();
      // This is a bit of a hack to reset the file input visually
      const fileInput = document.getElementById('image-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
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

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                </SelectContent>
              </Select>
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
                    Image must be a JPG, PNG, or WebP file under 5MB.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />

        <Button type="submit" disabled={isSubmitting}>
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
  );
}
