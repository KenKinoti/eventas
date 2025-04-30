import { Venue } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { cn, truncateText } from "@/lib/utils";

type VenueCardProps = {
  venue: Venue;
  className?: string;
};

export function VenueCard({ venue, className }: VenueCardProps) {
  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-shadow duration-300 group", className)}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={venue.imageUrl || "https://images.unsplash.com/photo-1527004013197-933c4bb611b3"} 
          alt={venue.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-lg font-semibold">{venue.name}</h3>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{venue.location}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="ml-1">{venue.rating || "4.5"}</span>
          </div>
        </div>
        
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3 line-clamp-2">
          {truncateText(venue.description || "", 100)}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {venue.capacity && (
            <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-200">
              Max: {venue.capacity} people
            </Badge>
          )}
          
          {venue.type && (
            <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 hover:bg-green-200">
              {venue.type}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
