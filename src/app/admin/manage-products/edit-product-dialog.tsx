
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
import { Loader2, Sparkles, Trash2, Video, FileImage } from "lucide-react";
import { updateProduct } from "./actions";
import { type Product, type ProductMedia } from "./page";
import { Textarea } from "@/components/ui/textarea";
import { generateProductDescription } from "@/ai/flows/generate-product-description";
import React, { useState } from "react";
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
import { Switch } from "@/components/ui/switch";

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const ACCEPTED_MEDIA_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm"];


const formSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  hint: z.string().min(2, "Hint must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.string().min(1, "Price is required."),
  size: z.string().optional(),
  isFeatured: z.boolean().default(false),
  files: z
    .array(z.any())
    .optional()
    .refine((files) => !files || files.every((file) => file.size <= MAX_FILE_SIZE), `Max file size is 15MB.`)
    .refine(
      (files) => !files || files.every((file) => ACCEPTED_MEDIA_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png, .webp, .gif, .mp4, and .webm files are accepted."
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
  const [currentMedia, setCurrentMedia] = useState<ProductMedia[]>(product.media || []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name || "",
      hint: product.hint || "",
      description: product.description || "",
      price: product.price || "On Enquiry",
      size: product.size || "",
      isFeatured: product.isFeatured || false,
      files: [],
    },
  });

  const { isSubmitting } = form.formState;
  
  const removeMedia = (index: number) => {
    setCurrentMedia(currentMedia.filter((_, i) => i !== index));
  }

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
    formData.append("size", values.size || "");
    formData.append("isFeatured", String(values.isFeatured));
    formData.append("existingMedia", JSON.stringify(currentMedia));
    if (values.files) {
        values.files.forEach(file => {
            formData.append('files', file);
        });
    }

    try {
      await updateProduct(categoryId, product.id, formData);
      toast({
        title: "Product Updated",
        description: `${values.name} has been successfully updated.`,
      });
      onProductUpdated();
      onClose();
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Failed to update product. Please try again.",
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
                <div className="space-y-2">
                    <FormLabel>Current Media</FormLabel>
                    {currentMedia.length > 0 ? (
                        <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                        {currentMedia.map((media, index) => (
                            <div key={index} className="relative group w-24 h-24">
                                {media.type === 'image' ? (
                                    <Image src={media.url} alt={`Product media ${index + 1}`} fill className="rounded-md object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-black rounded-md flex items-center justify-center">
                                        <Video className="h-8 w-8 text-white"/>
                                    </div>
                                )}
                                <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeMedia(index)}
                                >
                                <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No media currently attached.</p>
                    )}
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
                 <div className="grid md:grid-cols-2 gap-6">
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
                        name="size"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Size (Optional)</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., 12x16 inches" {...field} />
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
                    name="files"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Add More Media</FormLabel>
                        <FormControl>
                             <Input 
                                id="files-input-edit"
                                type="file"
                                multiple
                                accept={ACCEPTED_MEDIA_TYPES.join(",")}
                                onChange={(e) => field.onChange(e.target.files ? Array.from(e.target.files) : [])}
                            />
                        </FormControl>
                        <FormDescription>
                            Upload additional files for this product.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Feature this product?</FormLabel>
                            <FormDescription>
                                Featured products appear in a special section at the top. (Max 10)
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                />

                <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between sm:items-center w-full">
                  <DeleteProductButton 
                    categoryId={categoryId} 
                    productId={product.id}
                    productMedia={product.media}
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
