import { MainLayout } from "@/components/layout/main-layout";
import { EventCard } from "@/components/event-card";
import { CategoryCard } from "@/components/category-card";
import { UpcomingEventItem } from "@/components/upcoming-event-item";
import { VenueCard } from "@/components/venue-card";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Event, Category, Venue } from "@shared/schema";
import { Loader2, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function HomePage() {
  const { 
    data: recommendedEvents, 
    isLoading: isLoadingRecommended 
  } = useQuery<Event[]>({
    queryKey: ["/api/events/recommended"],
  });

  const { 
    data: categories, 
    isLoading: isLoadingCategories 
  } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { 
    data: upcomingEvents, 
    isLoading: isLoadingUpcoming 
  } = useQuery<Event[]>({
    queryKey: ["/api/events/upcoming"],
  });

  const { 
    data: featuredVenues, 
    isLoading: isLoadingVenues 
  } = useQuery<Venue[]>({
    queryKey: ["/api/venues/featured"],
  });

  return (
    <MainLayout>
      {/* Recommended Events Section */}
      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-heading font-semibold mb-4">Recommended For You</h2>
        {isLoadingRecommended ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommendedEvents?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-heading font-semibold mb-4">Browse by Category</h2>
        {isLoadingCategories ? (
          <div className="flex justify-center items-center h-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {categories?.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Events Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-heading font-semibold">Upcoming Events</h2>
          <Link href="/events">
            <div className="text-primary hover:underline text-sm font-medium flex items-center cursor-pointer">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </Link>
        </div>
        
        {isLoadingUpcoming ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Card className="overflow-hidden">
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {upcomingEvents?.map((event) => (
                <UpcomingEventItem key={event.id} event={event} />
              ))}
            </div>
          </Card>
        )}
      </section>

      {/* Featured Venues Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-heading font-semibold">Featured Venues</h2>
          <Link href="/venues">
            <div className="text-primary hover:underline text-sm font-medium flex items-center cursor-pointer">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </Link>
        </div>
        
        {isLoadingVenues ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredVenues?.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
}
