import { MainLayout } from "@/components/layout/main-layout";
import { VenueCard } from "@/components/venue-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Venue } from "@shared/schema";
import { Loader2, Search, Filter, ChevronDown, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function VenuesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const { 
    data: venues, 
    isLoading 
  } = useQuery<Venue[]>({
    queryKey: ["/api/venues"],
  });

  return (
    <MainLayout title="Venues">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
            <Input 
              className="pl-10" 
              placeholder="Search for venues by name, location, or capacity..." 
            />
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="flex items-center">
              Sort by: Rating
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList>
            <TabsTrigger value="all">All Venues</TabsTrigger>
            <TabsTrigger value="conference">Conference Centers</TabsTrigger>
            <TabsTrigger value="hotel">Hotel Ballrooms</TabsTrigger>
            <TabsTrigger value="outdoor">Outdoor Venues</TabsTrigger>
            <TabsTrigger value="unique">Unique Spaces</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div>
          {/* Featured Venue */}
          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-64 md:h-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205" 
                    alt="Grand Convention Center" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 md:w-1/2">
                  <div className="flex items-center mb-3">
                    <Badge variant="outline" className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200">
                      Featured Venue
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Grand Convention Center</h2>
                  <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Downtown San Francisco, CA</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1">4.9</span>
                    </div>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                    A premier convention center with state-of-the-art facilities, located in the heart of
                    downtown. Perfect for conferences, trade shows, and corporate events of all sizes.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                      Max: 2000 people
                    </Badge>
                    <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                      Conference Center
                    </Badge>
                    <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                      AV Equipment
                    </Badge>
                    <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">
                      Catering Available
                    </Badge>
                  </div>
                  <Button className="w-full sm:w-auto">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Venue Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues?.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
            
            {/* Additional dummy venues to fill the grid */}
            {Array(6).fill(0).map((_, i) => {
              const dummyVenue: Venue = {
                id: 1000 + i,
                name: [
                  "Harbor View Hotel",
                  "Urban Loft Space",
                  "Mountain Retreat Center",
                  "Historical Mansion",
                  "Riverside Pavilion",
                  "Tech Hub Conference Center"
                ][i],
                description: [
                  "Elegant hotel with panoramic views of the harbor, perfect for upscale events and conferences.",
                  "Modern loft space with industrial chic design, ideal for creative events and product launches.",
                  "Peaceful retreat center surrounded by nature, great for team-building and workshops.",
                  "Stunning historic mansion with classic architecture, perfect for elegant events.",
                  "Open-air pavilion along the river, ideal for outdoor events and celebrations.",
                  "Modern conference center with cutting-edge technology for tech events and meetups."
                ][i],
                location: [
                  "Waterfront District, Boston",
                  "Downtown Arts District, Portland",
                  "Mountain View, Colorado",
                  "Garden District, New Orleans",
                  "Riverside Park, Chicago",
                  "Innovation Corridor, Austin"
                ][i],
                capacity: [500, 150, 200, 120, 300, 400][i],
                imageUrl: `https://source.unsplash.com/random/600x400?venue,${i}`,
                type: [
                  "Hotel",
                  "Unique Space",
                  "Retreat Center",
                  "Historic Venue",
                  "Outdoor",
                  "Conference Center"
                ][i],
                amenities: "WiFi, AV Equipment, Catering",
                rating: (4 + Math.random() * 0.9).toFixed(1),
                createdAt: new Date()
              };
              
              return <VenueCard key={`dummy-${i}`} venue={dummyVenue} />;
            })}
          </div>
        </div>
      )}
    </MainLayout>
  );
}