import { Event } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star } from "lucide-react";
import { cn, truncateText } from "@/lib/utils";

type EventCardProps = {
  event: Event;
  className?: string;
};

export function EventCard({ event, className }: EventCardProps) {
  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-shadow duration-300 group", className)}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.imageUrl || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622"} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        {event.isNew && (
          <div className="absolute top-3 right-3 bg-accent text-white text-xs font-medium px-2 py-1 rounded-full">
            New
          </div>
        )}
        {event.isFeatured && (
          <div className="absolute top-3 right-3 bg-secondary text-white text-xs font-medium px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{event.title}</h3>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm">4.8</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{event.location}</span>
          <span className="mx-2">•</span>
          <Calendar className="h-4 w-4 mr-1" />
          <span>{event.date}</span>
        </div>
        
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-2">
          {truncateText(event.description || "", 100)}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="text-primary dark:text-primary-foreground font-medium">{event.price}</div>
          <Button size="sm">
            Register Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
