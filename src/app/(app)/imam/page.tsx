'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
// import { askImam } from '@/ai/flows/imam-flow'; // Disabled for mobile build
import { Bot, Loader, Send, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function ImamPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Placeholder response for mobile build - replace with API call to your backend
      const response = "As-Salaam-Alaikum! Thank you for your question. This feature is currently being prepared for mobile. In the meantime, please consult with your local Imam or Islamic scholar for guidance on your question: '" + input + "'";
      const modelMessage: Message = { role: 'model', content: response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Failed to get response from AI Imam:', error);
      const errorMessage: Message = {
        role: 'model',
        content: "I'm sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages]);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
       <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">AI Imam</h1>
        <p className="text-muted-foreground">Your personal guide for Islamic questions.</p>
      </div>

      <Card className="flex-1 mt-6 flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.length === 0 && (
                 <Card className="flex flex-col items-center justify-center p-12 text-center bg-transparent border-none shadow-none">
                    <CardHeader>
                        <Avatar className="w-16 h-16 mb-4">
                            <AvatarFallback className="bg-primary/10"><Bot className="w-8 h-8 text-primary" /></AvatarFallback>
                        </Avatar>
                        <CardTitle className="font-headline">Ask Imam Noor</CardTitle>
                        <CardDescription>You can ask me about verses, hadith, Islamic history, or general guidance.</CardDescription>
                    </CardHeader>
                </Card>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'model' && (
                  <Avatar className="w-8 h-8">
                     <AvatarFallback className="bg-primary/10"><Bot className="w-4 h-4 text-primary" /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-md rounded-xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4 justify-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10"><Bot className="w-4 h-4 text-primary" /></AvatarFallback>
                </Avatar>
                <div className="max-w-md rounded-xl px-4 py-3 bg-muted flex items-center">
                  <Loader className="w-5 h-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              autoComplete="off"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
