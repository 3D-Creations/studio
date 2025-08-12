
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
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

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "video/mp4", "application/pdf"];


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  productInterest: z.string().min(2, "Please specify your product interest."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  attachment: z
    .any()
    .refine((files) => !files || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
      (files) => !files || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png, .webp, .mp4 and .pdf files are accepted."
    ).optional()
})

export function ContactForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      productInterest: "",
      message: "",
      attachment: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let attachmentUrl = "";
      const file = values.attachment?.[0];

      if (file) {
        const storageRef = ref(storage, `inquiry-attachments/${Date.now()}-${file.name}`);
        const uploadResult = await uploadBytes(storageRef, file);
        attachmentUrl = await getDownloadURL(uploadResult.ref);
      }

      await addDoc(collection(db, "inquiries"), {
        name: values.name,
        email: values.email,
        company: values.company || '',
        productInterest: values.productInterest,
        message: values.message,
        attachmentUrl: attachmentUrl,
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
          name="attachment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attach File (Optional)</FormLabel>
              <FormControl>
                <Input type="file" onChange={(e) => field.onChange(e.target.files)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full md:w-auto" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
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
