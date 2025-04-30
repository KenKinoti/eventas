import { Event } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

type UpcomingEventItemProps = {
  event: Event;
};

export function UpcomingEventItem({ event }: UpcomingEventItemProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const registerMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/events/${event.id}/register`);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration successful",
        description: `You are now registered for ${event.title}`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user/registrations"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });

  // Extract month and day for the date display
  let month = "JUL";
  let day = "15";
  
  if (event.date) {
    const dateMatch = event.date.match(/([A-Za-z]{3})\s*(\d{1,2})/);
    if (dateMatch) {
      month = dateMatch[1].toUpperCase();
      day = dateMatch[2];
    }
  }

  return (
    <div className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <div className="flex-shrink-0 w-full sm:w-auto mb-4 sm:mb-0">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 text-center sm:w-16">
            <span className="block text-primary text-sm font-medium">{month}</span>
            <span className="block text-primary-800 dark:text-primary-200 text-xl font-bold">{day}</span>
          </div>
        </div>
        
        <div className="sm:ml-4 flex-grow">
          <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{event.location}</span>
            <span className="mx-2">•</span>
            <span>{event.time || "All day"}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {event.categoryId && (
              <Badge variant="outline" className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 hover:bg-primary-200">
                Networking
              </Badge>
            )}
            {event.isFeatured && (
              <Badge variant="outline" className="bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-200 hover:bg-secondary-200">
                Featured
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0 sm:ml-4">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center border-2 border-white dark:border-neutral-800">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">+25 going</span>
        </div>
        
        <div className="sm:ml-6 mt-4 sm:mt-0">
          <Button 
            size="sm"
            onClick={() => registerMutation.mutate()}
            disabled={registerMutation.isPending || !user}
          >
            {registerMutation.isPending ? "Processing..." : "RSVP"}
          </Button>
        </div>
      </div>
    </div>
  );
}
