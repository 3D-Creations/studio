
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { updateProduct } from "./actions";
import { type Product } from "./page";
import { Textarea } from "@/components/ui/textarea";
import { generateProductDescription } from "@/ai/flows/generate-product-description";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import Image from "next/image";
import { DeleteProductButton } from "./delete-product-button";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

const formSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  hint: z.string().min(2, "Hint must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.string().min(1, "Price is required."),
  image: z
    .any()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      ".jpg, .jpeg, .png, .webp, and .gif files are accepted."
    ),
});

interface EditProductDialogProps {
  product: Product;
  categoryId: string;
  isOpen: boolean;
  onClose: () => void;
  onProductUpdated: () => void;
}

export function EditProductDialog({ product, categoryId, isOpen, onClose, onProductUpdated }: EditProductDialogProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name || "",
      hint: product.hint || "",
      description: product.description || "",
      price: product.price || "On Enquiry",
      image: undefined,
    },
  });

  const { isSubmitting } = form.formState;

  const handleGenerateDescription = async () => {
    const productName = form.getValues("name");
    if (!productName) {
      toast({
        title: "Missing Information",
        description: "Please enter a product name first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    try {
      // We don't have category name here, but the productName should be enough
      const result = await generateProductDescription({ productName, categoryName: "" });
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
    formData.append("price", values.price);
    formData.append("existingImageUrl", product.image);
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      await updateProduct(categoryId, product.id, formData);
      toast({
        title: "Product Updated",
        description: `${values.name} has been successfully updated.`,
      });
      onProductUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    }
  }

  const handleClose = () => {
    form.reset();
    onClose();
  }
  
  const handleProductDeleted = () => {
    onProductUpdated();
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Edit Product: {product.name}</DialogTitle>
                <DialogDescription>
                Make changes to the product details and save them.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-center my-4">
                    <Image src={product.image} alt={product.name} width={150} height={150} className="rounded-lg object-cover aspect-square" />
                </div>
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
                        placeholder="Describe the product in detail..."
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
                        <FormLabel>Replace Image (Optional)</FormLabel>
                        <FormControl>
                            <Input 
                                id="image-input-edit"
                                type="file" 
                                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
                                {...rest}
                            />
                        </FormControl>
                        <FormDescription>
                            Upload a new file to replace the current image.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between sm:items-center w-full">
                  <DeleteProductButton 
                    categoryId={categoryId} 
                    productId={product.id}
                    productImage={product.image}
                    onProductDeleted={handleProductDeleted} 
                  />
                  <div className="flex flex-col-reverse sm:flex-row sm:space-x-2">
                    <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                    <Button type="submit" disabled={isSubmitting || isGenerating}>
                    {isSubmitting ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                        </>
                    ) : (
                        "Save Changes"
                    )}
                    </Button>
                  </div>
                </DialogFooter>
            </form>
            </Form>
        </DialogContent>
    </Dialog>
  );
}
