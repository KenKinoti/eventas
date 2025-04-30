import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Star, MoreHorizontal } from "lucide-react";
import { UpcomingEventItem } from "@/components/upcoming-event-item";
import { useQuery } from "@tanstack/react-query";
import { Event, Registration } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

export default function MyEventsPage() {
  const { user } = useAuth();
  
  const { 
    data: registrations, 
    isLoading: isLoadingRegistrations 
  } = useQuery<Registration[]>({
    queryKey: ["/api/user/registrations"],
    enabled: !!user,
  });

  const { 
    data: upcomingEvents, 
    isLoading: isLoadingUpcoming 
  } = useQuery<Event[]>({
    queryKey: ["/api/events/upcoming"],
  });

  return (
    <MainLayout title="My Events">
      <Tabs defaultValue="registered" className="mb-8">
        <TabsList>
          <TabsTrigger value="registered">Registered</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
          <TabsTrigger value="hosting">Hosting</TabsTrigger>
        </TabsList>
        
        <TabsContent value="registered" className="mt-6">
          {isLoadingRegistrations ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : registrations && registrations.length > 0 ? (
            <div className="grid gap-6">
              {/* Show some dummy registrations since we haven't implemented this fully */}
              {Array(3).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/4 h-48 md:h-auto">
                      <img 
                        src={`https://source.unsplash.com/random/600x400?event,${i}`}
                        alt={`Event ${i+1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="p-6 md:flex-1">
                      <div className="flex flex-wrap justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold">{`${i === 0 ? 'Tech Innovation Summit' : i === 1 ? 'Design Workshop 2023' : 'Business Conference'}`}</h3>
                          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{`${['Jul 15', 'Aug 22', 'Sep 10'][i]}, 2023`}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{`${[9, 10, 11][i]}:00 AM - ${[4, 5, 6][i]}:00 PM`}</span>
                          </div>
                          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{`${['Convention Center', 'Design Hub', 'Business Tower'][i]}, ${'San Francisco, CA'}`}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 mt-1 md:mt-0">
                          Confirmed
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-4">
                        <div className="flex items-center">
                          <div className="flex -space-x-2">
                            {Array(3).fill(0).map((_, j) => (
                              <div key={j} className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-800 overflow-hidden">
                                <img 
                                  src={`https://randomuser.me/api/portraits/${j % 2 === 0 ? 'men' : 'women'}/${20 + j}.jpg`}
                                  alt="Attendee" 
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-neutral-500">+{42 + i} attendees</span>
                        </div>
                        
                        <div className="flex items-center ml-auto">
                          <Button variant="outline" size="sm" className="mr-2">
                            View Ticket
                          </Button>
                          <Button variant="outline" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-800/30 rounded-lg">
              <Calendar className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Registered Events</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md mx-auto">
                You haven't registered for any events yet. Explore upcoming events and register for ones that interest you.
              </p>
              <Button>Explore Events</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved" className="mt-6">
          <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-800/30 rounded-lg">
            <Star className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No Saved Events</h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md mx-auto">
              You haven't saved any events for later. Save events you're interested in to find them easily.
            </p>
            <Button>Explore Events</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-6">
          <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-800/30 rounded-lg">
            <Clock className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No Past Events</h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md mx-auto">
              You haven't attended any events yet. Once you attend events, they'll appear here.
            </p>
            <Button>Explore Events</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="hosting" className="mt-6">
          <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-800/30 rounded-lg">
            <Users className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">Not Hosting Any Events</h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md mx-auto">
              You're not hosting any events yet. Create an event to start organizing and managing attendees.
            </p>
            <Button>Create Event</Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
      {isLoadingUpcoming ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {upcomingEvents?.slice(0, 3).map((event) => (
              <UpcomingEventItem key={event.id} event={event} />
            ))}
          </div>
        </Card>
      )}
    </MainLayout>
  );
}