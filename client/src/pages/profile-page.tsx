import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  bio: z.string().max(160, "Bio must not be longer than 160 characters.").optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  avatarUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const notificationsFormSchema = z.object({
  eventUpdates: z.boolean(),
  newEvents: z.boolean(),
  eventReminders: z.boolean(),
  eventRecommendations: z.boolean(),
  marketing: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

export default function ProfilePage() {
  const { user, logoutMutation } = useAuth();

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      phone: user?.phone || "",
      location: user?.location || "",
      avatarUrl: user?.avatarUrl || "",
    },
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      eventUpdates: true,
      newEvents: true,
      eventReminders: true,
      eventRecommendations: true,
      marketing: false,
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    // In a real app, we would update the user profile here
    console.log("Profile data submitted:", data);
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    // In a real app, we would update notification settings here
    console.log("Notification settings submitted:", data);
  }

  return (
    <MainLayout title="Profile" showSearch={false}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user?.avatarUrl || ""} alt={user?.name || user?.username} />
                  <AvatarFallback className="text-lg">
                    {user?.name?.charAt(0) || user?.username?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1">{user?.name || user?.username}</h2>
                <p className="text-neutral-500 dark:text-neutral-400 mb-4">{user?.email || ""}</p>
                
                <div className="flex space-x-2 mb-6">
                  <Badge variant="outline" className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200">
                    Attendee
                  </Badge>
                </div>
                
                <div className="w-full space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-neutral-500 mr-3" />
                    <span>{user?.email || "No email added"}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-neutral-500 mr-3" />
                    <span>{user?.phone || "No phone added"}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-neutral-500 mr-3" />
                    <span>{user?.location || "No location added"}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-neutral-500 mr-3" />
                    <span>Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "recently"}</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full mt-6"
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {logoutMutation.isPending ? "Signing out..." : "Sign out"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Activity Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-300">Events Attended</span>
                  <Badge>3</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-300">Upcoming Events</span>
                  <Badge>2</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-300">Events Hosted</span>
                  <Badge>0</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-300">Network Connections</span>
                  <Badge>12</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="payment">Payment Methods</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and how others see you on the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="City, Country" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us a little about yourself"
                                className="resize-none h-24"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormDescription>
                              Brief description for your profile. Maximum 160 characters.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="avatarUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Profile Picture URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/your-picture.jpg" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter a URL for your profile picture.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure how and when you receive notifications about events and platform activity.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...notificationsForm}>
                    <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <FormField
                          control={notificationsForm.control}
                          name="eventUpdates"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between">
                              <div className="space-y-0.5">
                                <FormLabel>Event Updates</FormLabel>
                                <FormDescription>
                                  Receive notifications when events you've registered for have updates.
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
                          control={notificationsForm.control}
                          name="newEvents"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between">
                              <div className="space-y-0.5">
                                <FormLabel>New Events</FormLabel>
                                <FormDescription>
                                  Get notified about new events that match your interests.
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
                          control={notificationsForm.control}
                          name="eventReminders"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between">
                              <div className="space-y-0.5">
                                <FormLabel>Event Reminders</FormLabel>
                                <FormDescription>
                                  Receive reminders before your registered events.
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
                          control={notificationsForm.control}
                          name="eventRecommendations"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between">
                              <div className="space-y-0.5">
                                <FormLabel>Event Recommendations</FormLabel>
                                <FormDescription>
                                  Get personalized event recommendations based on your preferences.
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
                          control={notificationsForm.control}
                          name="marketing"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between">
                              <div className="space-y-0.5">
                                <FormLabel>Marketing Emails</FormLabel>
                                <FormDescription>
                                  Receive emails about special offers and platform updates.
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
                      </div>
                      
                      <Button type="submit">Save Preferences</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-800/30 rounded-lg">
                      <CreditCard className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Payment Methods</h3>
                      <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md mx-auto">
                        You haven't added any payment methods yet. Add a payment method to quickly register for paid events.
                      </p>
                      <Button>Add Payment Method</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and privacy settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-neutral-500 mr-3" />
                        <div>
                          <h4 className="font-medium">Change Password</h4>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Update your password to keep your account secure
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Change</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 text-neutral-500 mr-3" />
                        <div>
                          <h4 className="font-medium">Login Notifications</h4>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Receive notifications for new logins to your account
                          </p>
                        </div>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <Settings className="h-5 w-5 text-neutral-500 mr-3" />
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Setup</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}