"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  seoOptimizationSuggestions,
  type SEOOptimizationSuggestionsOutput,
} from "@/ai/flows/seo-optimization-suggestions"

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
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Loader2 } from "lucide-react"

const formSchema = z.object({
  text: z
    .string()
    .min(50, "Please enter at least 50 characters for effective suggestions."),
})

export function SeoOptimizerClient() {
  const [result, setResult] =
    useState<SEOOptimizationSuggestionsOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setResult(null)
    try {
      const suggestions = await seoOptimizationSuggestions(values)
      setResult(suggestions)
    } catch (error) {
      console.error("Error generating SEO suggestions:", error)
      // Optionally, show a toast notification for the error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-6">
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Content Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Text Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your product description, blog post, or any other text content here..."
                          className="min-h-[250px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide the text you want to optimize for SEO.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Get Suggestions
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="min-h-[460px]">
          <CardHeader>
            <CardTitle className="font-headline">AI Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {!isLoading && !result && (
              <div className="flex flex-col items-center justify-center text-center h-64 text-muted-foreground">
                 <Lightbulb className="h-12 w-12 mb-4" />
                <p>Your SEO suggestions will appear here.</p>
              </div>
            )}
            {result && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Suggested Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    SEO-Optimized Description
                  </h3>
                  <p className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-md">
                    {result.description}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
