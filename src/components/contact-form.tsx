
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, Loader2 } from "lucide-react"
import { db, storage } from "@/lib/firebase"

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid contact number."),
  location: z.string().optional(),
  company: z.string().optional(),
  productInterest: z.string().min(2, "Please specify your product interest."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  file: z
    .any()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ).optional(),
})

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      company: "",
      productInterest: "",
      message: "",
      file: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      let fileUrl = '';
      if (values.file) {
        const file = values.file;
        const uniqueFileName = `${Date.now()}-${file.name}`;
        const fileRef = storageRef(storage, `inquiries/${uniqueFileName}`);
        
        toast({ title: "Uploading file...", description: "Please wait." });
        await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(fileRef);
        toast({ title: "File uploaded!", description: "Your file has been attached." });
      }

      await addDoc(collection(db, "inquiries"), {
        name: values.name,
        email: values.email,
        phone: values.phone,
        location: values.location || '',
        company: values.company || '',
        productInterest: values.productInterest,
        message: values.message,
        fileUrl: fileUrl,
        createdAt: serverTimestamp(),
        status: 'New',
        assignedTo: ''
      });

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you shortly.",
      })
      form.reset()
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      })
    } finally {
        setIsSubmitting(false);
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
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact No.</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+91 12345 67890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="City, Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Company (Optional)</FormLabel>
                <FormControl>
                    <Input placeholder="Your Company Inc." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="productInterest"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Product Interest</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Lenticular Posters, Pharma Gifts" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about your project or inquiry..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Attach File (Optional)</FormLabel>
                <FormControl>
                    <Input 
                        type="file" 
                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                    />
                </FormControl>
                <FormDescription>
                    Attach a design file or reference image (JPG, PNG, WebP up to 5MB).
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
             ) : (
              <>
                Send Message
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
             )
            }
        </Button>
      </form>
    </Form>
  )
}
