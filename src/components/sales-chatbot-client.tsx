
"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CornerDownLeft, Loader2, User, Bot } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { SalesChatbotInput, SalesChatbotOutput } from '@/ai/flows/sales-chatbot';

const formSchema = z.object({
  prompt: z.string().min(1, "Message cannot be empty."),
});

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface SalesChatbotClientProps {
  salesChatbot: (input: SalesChatbotInput) => Promise<SalesChatbotOutput>;
}

export function SalesChatbotClient({ salesChatbot }: SalesChatbotClientProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: values.prompt };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    form.reset();

    try {
      const history = newMessages.slice(0, -1).map(msg => ({ // Send all but the last message as history
        role: msg.role,
        content: [{ text: msg.content }],
      }));
      
      const response = await salesChatbot({
        history: history,
        prompt: values.prompt,
      });

      const modelMessage: Message = { role: 'model', content: response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error("Error calling chatbot:", error);
      const errorMessage: Message = { role: 'model', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-0">
        <div className="flex flex-col h-[70vh]">
          <ScrollArea className="flex-grow p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground pt-16">
                  <Bot className="mx-auto h-12 w-12 mb-4" />
                  <p className="text-lg">Welcome! How can I help you today?</p>
                  <p className="text-sm">You can ask things like "Research Acme Corp" or "What are some good conversation starters for a lead interested in lenticular printing?".</p>
                </div>
              )}
              {messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                  {message.role === 'model' && (
                    <div className="p-2 bg-primary rounded-full text-primary-foreground">
                      <Bot className="h-6 w-6" />
                    </div>
                  )}
                  <div className={`p-3 rounded-lg max-w-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                   {message.role === 'user' && (
                    <div className="p-2 bg-secondary rounded-full text-secondary-foreground">
                      <User className="h-6 w-6" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary rounded-full text-primary-foreground">
                      <Bot className="h-6 w-6" />
                    </div>
                    <div className="p-3 rounded-lg bg-secondary flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input
                          placeholder="Ask a question or enter a research query..."
                          {...field}
                          disabled={isLoading}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <CornerDownLeft className="h-5 w-5" />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
