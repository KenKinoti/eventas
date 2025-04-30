import { MainLayout } from "@/components/layout/main-layout";
import { EventCard } from "@/components/event-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, Search, ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const { 
    data: events, 
    isLoading 
  } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  return (
    <MainLayout title="Explore Events">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
            <Input 
              className="pl-10" 
              placeholder="Search for events, venues, organizers..." 
            />
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="flex items-center">
              Sort by: Recent
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList>
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="weekend">This Weekend</TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
            <TabsTrigger value="virtual">Virtual</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          
          {/* Popular Event */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-3 mb-6">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-60 md:h-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4" 
                    alt="Tech Conference 2023" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 md:w-1/2">
                  <div className="flex items-center mb-3">
                    <span className="px-3 py-1 bg-secondary text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                    <span className="ml-3 text-sm text-neutral-500">July 15-17, 2023</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">International Tech Conference 2023</h2>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                    Join the biggest tech conference of the year featuring keynotes from industry leaders,
                    hands-on workshops, and networking opportunities with professionals from around the globe.
                  </p>
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                      <img 
                        src="https://randomuser.me/api/portraits/men/32.jpg" 
                        alt="Organizer" 
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">TechCorp Inc.</p>
                      <p className="text-sm text-neutral-500">Event Organizer</p>
                    </div>
                  </div>
                  <Button className="w-full sm:w-auto">Register Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Additional events to fill out the grid */}
          {Array(5).fill(0).map((_, i) => {
            const dummyEvent: Event = {
              id: 1000 + i,
              title: `Workshop: ${i % 2 === 0 ? 'AI for Beginners' : 'Web Development Masterclass'}`,
              description: `Learn the fundamentals of ${i % 2 === 0 ? 'artificial intelligence' : 'modern web development'} in this hands-on workshop.`,
              date: `Aug ${10 + i}, 2023`,
              time: `${1 + i}:00 PM - ${3 + i}:00 PM`,
              location: `${i % 2 === 0 ? 'Online' : 'Innovation Center'}`,
              price: `${i % 3 === 0 ? 'Free' : '$' + (25 * (i + 1))}`,
              imageUrl: `https://source.unsplash.com/random/600x400?tech,${i}`,
              organizerId: 1,
              venueId: i % 3 + 1,
              categoryId: i % 5 + 1,
              isVirtual: i % 2 === 0,
              isFeatured: i === 2,
              isNew: i === 0,
              createdAt: new Date()
            };
            
            return <EventCard key={`dummy-${i}`} event={dummyEvent} />;
          })}
        </div>
      )}
    </MainLayout>
  );
}