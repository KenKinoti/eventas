import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, MapPin, Users, Plus, Clock, Link, Upload, ArrowRight } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { insertEventSchema, type InsertEvent, Category, Venue } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useLocation } from "wouter";

// Extended schema with validation
const createEventSchema = insertEventSchema.extend({
  date: z.date({ required_error: "Please select a date" }),
  time: z.string().min(1, "Please enter the time"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  price: z.string().min(1, "Please enter the price or 'Free'"),
  imageUrl: z.string().url("Please enter a valid URL").optional(),
  categoryId: z.coerce.number({ required_error: "Please select a category" }),
  venueId: z.coerce.number().optional(),
  isVirtual: z.boolean().default(false),
});

type CreateEventValues = z.infer<typeof createEventSchema>;

export default function CreateEventPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic");
  const [, navigate] = useRouter();
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  const { data: venues } = useQuery<Venue[]>({
    queryKey: ["/api/venues"],
  });
  
  const form = useForm<CreateEventValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      price: "",
      isVirtual: false,
      imageUrl: "",
    },
  });
  
  const createEventMutation = useMutation({
    mutationFn: async (values: CreateEventValues) => {
      // Format date to string for API
      const eventData = {
        ...values,
        date: format(values.date, "MMM dd, yyyy"),
      };
      
      const res = await apiRequest("POST", "/api/events", eventData);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Event created",
        description: "Your event has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      queryClient.invalidateQueries({ queryKey: ["/api/events/upcoming"] });
      navigate("/my-events");
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create event",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(values: CreateEventValues) {
    createEventMutation.mutate(values);
  }
  
  function goToNextTab() {
    if (activeTab === "basic") {
      if (form.getValues().title && form.getValues().description) {
        setActiveTab("details");
      } else {
        form.trigger(["title", "description"]);
      }
    } else if (activeTab === "details") {
      if (form.getValues().date && form.getValues().location) {
        setActiveTab("additional");
      } else {
        form.trigger(["date", "location"]);
      }
    }
  }

  return (
    <MainLayout title="Create Event" showSearch={false}>
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create a New Event</CardTitle>
            <CardDescription>
              Fill in the details to create and publish your event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Date & Location</TabsTrigger>
                <TabsTrigger value="additional">Additional Info</TabsTrigger>
              </TabsList>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <TabsContent value="basic">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Tech Conference 2023" {...field} />
                            </FormControl>
                            <FormDescription>
                              Create a clear and descriptive title for your event
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your event, including agenda, speakers, and what attendees can expect..." 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Provide details about your event to attract attendees
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Image URL</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <Input placeholder="https://example.com/image.jpg" {...field} value={field.value || ""} />
                                <Button type="button" variant="outline" size="icon" className="ml-2">
                                  <Upload className="h-4 w-4" />
                                </Button>
                              </div>
                            </FormControl>
                            <FormDescription>
                              Add an image URL for your event (recommended: 1200×600px)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories?.map((category) => (
                                  <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button type="button" onClick={goToNextTab} className="flex items-center">
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Event Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date(new Date().setHours(0, 0, 0, 0))
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Time</FormLabel>
                              <FormControl>
                                <div className="flex gap-2">
                                  <Clock className="h-5 w-5 text-neutral-500 self-center" />
                                  <Input placeholder="e.g. 6:00 PM - 9:00 PM" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="isVirtual"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between border p-4 rounded-lg">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Virtual Event</FormLabel>
                              <FormDescription>
                                Enable if this will be an online event
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {form.watch("isVirtual") ? "Virtual Location Link" : "Event Location"}
                            </FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                {form.watch("isVirtual") ? (
                                  <Link className="h-5 w-5 text-neutral-500 self-center" />
                                ) : (
                                  <MapPin className="h-5 w-5 text-neutral-500 self-center" />
                                )}
                                <Input 
                                  placeholder={form.watch("isVirtual") ? 
                                    "e.g. https://zoom.us/j/123456789" : 
                                    "e.g. Convention Center, 123 Main St, City"} 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              {form.watch("isVirtual") ? 
                                "Provide the link where attendees can join the virtual event" : 
                                "Enter the physical location where the event will take place"
                              }
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {!form.watch("isVirtual") && (
                        <FormField
                          control={form.control}
                          name="venueId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Venue (Optional)</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a venue (optional)" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {venues?.map((venue) => (
                                    <SelectItem key={venue.id} value={venue.id.toString()}>
                                      {venue.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Select from existing venues or enter a custom location above
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                          Back
                        </Button>
                        <Button type="button" onClick={goToNextTab} className="flex items-center">
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="additional">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Free, $10, $25-50" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter the price for your event, or "Free" if there's no cost
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="border p-4 rounded-lg space-y-4">
                        <h3 className="font-medium flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Capacity Settings
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Maximum Attendees</label>
                            <div className="flex mt-1">
                              <Input type="number" placeholder="e.g. 100" />
                              <Select defaultValue="unlimited">
                                <SelectTrigger className="w-[140px] ml-2">
                                  <SelectValue placeholder="Limit Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="unlimited">Unlimited</SelectItem>
                                  <SelectItem value="limited">Limited</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Registration Deadline</label>
                            <div className="flex mt-1">
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                <span>Pick a date</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border p-4 rounded-lg space-y-4">
                        <h3 className="font-medium">Registration Options</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">Collect Attendee Information</p>
                              <p className="text-xs text-neutral-500">Get name, email, and phone from attendees</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">Allow Guest Registration</p>
                              <p className="text-xs text-neutral-500">Let attendees register additional guests</p>
                            </div>
                            <Switch />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">Send Email Confirmations</p>
                              <p className="text-xs text-neutral-500">Automatically send confirmation emails</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                          Back
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={createEventMutation.isPending} 
                          className="flex items-center"
                        >
                          {createEventMutation.isPending ? "Creating Event..." : "Create Event"}
                          <Plus className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </form>
              </Form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}