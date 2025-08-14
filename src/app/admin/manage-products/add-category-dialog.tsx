
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { addCategory } from "./actions";

const formSchema = z.object({
  name: z.string().min(3, "Category name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
});

interface AddCategoryDialogProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onCategoryAdded: (newCategoryId: string) => void;
}

export function AddCategoryDialog({ children, isOpen, onClose, onCategoryAdded }: AddCategoryDialogProps) {
  const { toast } = useToast();
  const [internalIsOpen, setInternalIsOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { isSubmitting } = form.formState;
  
  const open = isOpen !== undefined ? isOpen : internalIsOpen;
  const setOpen = onClose !== undefined ? onClose : setInternalIsOpen;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);

    try {
      // For simplicity, we assume success and don't get the new ID back,
      // just trigger a refetch. A more advanced implementation might return the ID.
      await addCategory(formData);
      toast({
        title: "Category Added",
        description: `${values.name} has been successfully added.`,
      });
      form.reset();
      onCategoryAdded(""); // Pass empty string as we don't have the new ID here
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to add category. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new category to organize your products.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Custom Stationery" {...field} />
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
                  <FormLabel>Category Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what this category is about..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Category
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
