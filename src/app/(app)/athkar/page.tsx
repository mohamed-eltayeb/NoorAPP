import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { athkar } from "@/lib/placeholder-data";

export default function AthkarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Athkar</h1>
        <p className="text-muted-foreground">Daily remembrances for morning and evening.</p>
      </div>

      <Tabs defaultValue="morning" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="morning">Morning</TabsTrigger>
          <TabsTrigger value="evening">Evening</TabsTrigger>
        </TabsList>
        <TabsContent value="morning">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {athkar.morning.map((zikr, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="bg-card border-b-0 rounded-lg px-4">
                <AccordionTrigger className="text-left hover:no-underline">{zikr.title}</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-xl font-serif text-right leading-loose">{zikr.arabic}</p>
                  <p className="text-muted-foreground italic">&ldquo;{zikr.translation}&rdquo;</p>
                  <p className="text-sm text-muted-foreground font-semibold">{zikr.reference}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="evening">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {athkar.evening.map((zikr, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="bg-card border-b-0 rounded-lg px-4">
                <AccordionTrigger className="text-left hover:no-underline">{zikr.title}</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-xl font-serif text-right leading-loose">{zikr.arabic}</p>
                  <p className="text-muted-foreground italic">&ldquo;{zikr.translation}&rdquo;</p>
                  <p className="text-sm text-muted-foreground font-semibold">{zikr.reference}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
}
