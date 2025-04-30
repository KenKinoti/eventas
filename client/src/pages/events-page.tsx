import { MainLayout } from "@/components/layout/main-layout";
import { EventCard } from "@/components/event-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@shared/schema";
import { Loader2, Search, Filter, Calendar, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const { 
    data: events, 
    isLoading 
  } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  // Sample dates for calendar view
  const currentDate = new Date();
  const calendarDays = Array(7).fill(0).map((_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);
    return {
      date,
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayOfMonth: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      events: Math.floor(Math.random() * 3) // Random number of events (0-2)
    };
  });

  return (
    <MainLayout title="Events">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
            <Input 
              className="pl-10" 
              placeholder="Search for events, organizers, or locations..." 
            />
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="flex items-center">
              Sort by: Date
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList>
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="weekend">This Weekend</TabsTrigger>
            <TabsTrigger value="next-week">Next Week</TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Calendar View */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming Days
            </h3>
            <Button variant="ghost" size="sm">View Full Calendar</Button>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center p-3 rounded-lg transition-colors cursor-pointer
                  ${index === 0 ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200' : 
                  'bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
              >
                <span className="text-xs font-medium">{day.day}</span>
                <span className="text-xl font-bold my-1">{day.dayOfMonth}</span>
                <span className="text-xs">{day.month}</span>
                {day.events > 0 && (
                  <Badge className="mt-2 text-xs" variant="outline">
                    {day.events} {day.events === 1 ? 'event' : 'events'}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          
          {/* Additional dummy events to fill the grid */}
          {Array(9).fill(0).map((_, i) => {
            const categories = ['Business', 'Technology', 'Arts', 'Health', 'Networking', 'Education', 'Music', 'Food', 'Sports'];
            const titles = [
              'Digital Marketing Workshop',
              'AI Applications Conference',
              'Art & Design Exhibition',
              'Wellness & Mindfulness Retreat',
              'Industry Networking Mixer',
              'Professional Development Seminar',
              'Live Music Showcase',
              'Culinary Tasting Experience',
              'Outdoor Fitness Challenge'
            ];
            
            const dummyEvent: Event = {
              id: 1000 + i,
              title: titles[i],
              description: `Join us for this exciting ${categories[i].toLowerCase()} event featuring experts in the field and hands-on activities.`,
              date: `${['Jul', 'Aug', 'Sep'][Math.floor(i/3)]} ${15 + i}, 2023`,
              time: `${1 + (i % 12)}:00 ${i % 12 < 6 ? 'AM' : 'PM'} - ${3 + (i % 12)}:00 ${i % 12 < 6 ? 'AM' : 'PM'}`,
              location: `${['Convention Center', 'Innovation Hub', 'Creative Studio', 'Wellness Center', 'Business Lounge', 'Community College', 'Music Venue', 'Culinary Institute', 'Sports Complex'][i]}, San Francisco`,
              price: `${i % 3 === 0 ? 'Free' : '$' + (15 + i * 5)}`,
              imageUrl: `https://source.unsplash.com/random/600x400?${categories[i].toLowerCase()},event`,
              organizerId: 1,
              venueId: i % 3 + 1,
              categoryId: i % 5 + 1,
              isVirtual: i % 4 === 0,
              isFeatured: i === 3,
              isNew: i === 1,
              createdAt: new Date()
            };
            
            return <EventCard key={`dummy-${i}`} event={dummyEvent} />;
          })}
        </div>
      )}
    </MainLayout>
  );
}