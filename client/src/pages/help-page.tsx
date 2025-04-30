import { MainLayout } from "@/components/layout/main-layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  HelpCircle, 
  FileText, 
  MessageCircle, 
  Phone, 
  Mail,
  Calendar,
  Users,
  CreditCard,
  Lock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HelpPage() {
  return (
    <MainLayout title="Help & Support" showSearch={false}>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">How can we help you?</h2>
              <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                Search our help center or browse common topics below
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                <Input 
                  className="pl-10 pr-16" 
                  placeholder="Search for help..." 
                />
                <Button className="absolute right-1 top-1 h-8">Search</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="#attending" className="flex flex-col items-center p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium text-center">Attending Events</span>
              </a>
              
              <a href="#organizing" className="flex flex-col items-center p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <Users className="h-8 w-8 text-violet-500 mb-2" />
                <span className="text-sm font-medium text-center">Organizing Events</span>
              </a>
              
              <a href="#payment" className="flex flex-col items-center p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <CreditCard className="h-8 w-8 text-green-500 mb-2" />
                <span className="text-sm font-medium text-center">Payments & Refunds</span>
              </a>
              
              <a href="#account" className="flex flex-col items-center p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <Lock className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-sm font-medium text-center">Account & Security</span>
              </a>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="faq" className="mb-8">
          <TabsList>
            <TabsTrigger value="faq">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="guides">
              <FileText className="h-4 w-4 mr-2" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="contact">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Support
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="mt-6">
            <div className="space-y-8">
              <div id="attending">
                <h3 className="text-lg font-semibold mb-4">Attending Events</h3>
                <Accordion type="single" collapsible className="bg-white dark:bg-neutral-800 rounded-lg border">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="px-4">How do I register for an event?</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <p className="mb-2">To register for an event:</p>
                      <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
                        <li>Navigate to the event page you wish to attend</li>
                        <li>Click the "Register" or "RSVP" button</li>
                        <li>Follow the prompts to complete your registration</li>
                        <li>You'll receive a confirmation email with event details</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="px-4">How do I view my upcoming events?</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <p className="mb-2">
                        You can view all events you've registered for in the "My Events" section. 
                        Navigate there from the sidebar menu or mobile navigation.
                      </p>
                      <p>
                        Your events are organized by upcoming and past events, and you can see your 
                        ticket information, event details, and any updates from the organizers.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="px-4">How do I join virtual events?</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <p className="mb-2">To join a virtual event:</p>
                      <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
                        <li>Go to your "My Events" page</li>
                        <li>Find the virtual event you're registered for</li>
                        <li>Click "Join Event" or "View Details" to access the virtual event link</li>
                        <li>You can also find the link in your event confirmation email</li>
                      </ol>
                      <p className="mt-2">
                        We recommend joining a few minutes early to test your connection and setup.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="px-4">Can I get a refund if I can't attend?</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <p>
                        Refund policies are set by event organizers and vary by event. Check the 
                        event description for specific refund policies. Generally, you can request 
                        a refund by going to your "My Events" page, selecting the event, and clicking 
                        "Request Refund". Requests must typically be made at least 24-48 hours before 
                        the event starts.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div id="organizing">
                <h3 className="text-lg font-semibold mb-4">Organizing Events</h3>
                <Accordion type="single" collapsible className="bg-white dark:bg-neutral-800 rounded-lg border">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="px-4">How do I create a new event?</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <p className="mb-2">To create a new event:</p>
                      <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
                        <li>Click the "Create Event" button in the top navigation</li>
                        <li>Fill out the event details (title, description, date, location, etc.)</li>
                        <li>Configure additional settings like capacity and registration options</li>
                        <li>Upload an event image to make your event stand out</li>
                        <li>Click "Create Event" to publish</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="px-4">How do I manage event registrations?</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <p className="mb-2">
                        After creating an event, you can manage registrations in the "My Events" section 
                        under the "Hosting" tab:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
                        <li>View attendee lists and registration details</li>
                        <li>Send messages or updates to all registrants</li>
                        <li>Export attendee information</li>
                        <li>Manually add or remove registrations</li>
                        <li>Check in attendees on the day of the event</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="px-4">How do I set up a virtual event?</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <p className="mb-2">
                        Creating a virtual event follows the same process as in-person events, with a few key differences:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
                        <li>Toggle the "Virtual Event" switch to "Yes" during event creation</li>
                        <li>Add the virtual event link (Zoom, Google Meet, etc.) in the location field</li>
                        <li>Optionally, set up integration with streaming services</li>
                        <li>Consider enabling features like polls, Q&A, and live chat</li>
                      </ol>
                      <p className="mt-2">
                        Virtual event links are automatically sent to registered attendees.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div id="payment">
                <h3 className="text-lg font-semibold mb-4">Payments & Refunds</h3>
                <Accordion type="single" collapsible className="bg-white dark:bg-neutral-800 rounded-lg border">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="px-4">What payment methods are accepted?</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <p className="mb-2">We accept the following payment methods:</p>
                      <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
                        <li>Credit/Debit Cards (Visa, Mastercard, American Express, Discover)</li>
                        <li>PayPal</li>
                        <li>Apple Pay (on iOS devices)</li>
                        <li>Google Pay (on Android devices)</li>
                      </ul>
                      <p className="mt-2">
                        All payments are securely processed and encrypted.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="px-4">How do refunds work for attendees?</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <p className="mb-2">
                        When you request a refund as an attendee:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
                        <li>The refund request is sent to the event organizer for approval</li>
                        <li>If approved, the refund is processed to your original payment method</li>
                        <li>Refunds typically take 5-10 business days to appear in your account</li>
                        <li>You'll receive email notifications about the status of your refund</li>
                      </ol>
                      <p className="mt-2">
                        Note: Refund eligibility depends on the organizer's refund policy.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="px-4">How do I set up payments for my events?</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <p className="mb-2">
                        To collect payments for your events:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
                        <li>Go to your account settings</li>
                        <li>Navigate to "Payment Methods" under "Organizer Settings"</li>
                        <li>Connect your payment account (Stripe, PayPal, etc.)</li>
                        <li>Set ticket prices when creating events</li>
                        <li>Configure payout settings (bank account, frequency, etc.)</li>
                      </ol>
                      <p className="mt-2">
                        Standard processing fees apply (typically 2.9% + $0.30 per transaction).
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div id="account">
                <h3 className="text-lg font-semibold mb-4">Account & Security</h3>
                <Accordion type="single" collapsible className="bg-white dark:bg-neutral-800 rounded-lg border">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="px-4">How do I update my profile information?</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <p className="mb-2">To update your profile:</p>
                      <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
                        <li>Click on your profile picture or name in the top right</li>
                        <li>Select "Profile" from the dropdown menu</li>
                        <li>Click the "Edit Profile" button</li>
                        <li>Update your information as needed</li>
                        <li>Click "Save Changes" to apply your updates</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="px-4">How do I change my password?</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <p className="mb-2">
                        To change your password:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
                        <li>Go to your "Profile" page</li>
                        <li>Click on the "Security" tab</li>
                        <li>Click "Change Password"</li>
                        <li>Enter your current password for verification</li>
                        <li>Enter and confirm your new password</li>
                        <li>Click "Update Password" to save</li>
                      </ol>
                      <p className="mt-2">
                        For security reasons, you'll receive an email notification about the password change.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="px-4">How can I keep my account secure?</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <p className="mb-2">
                        To keep your account secure:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
                        <li>Use a strong, unique password</li>
                        <li>Enable two-factor authentication (2FA) in security settings</li>
                        <li>Don't share your account credentials with others</li>
                        <li>Log out when using shared or public computers</li>
                        <li>Keep your email address up to date (for recovery purposes)</li>
                        <li>Check your login history regularly for suspicious activity</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="guides" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Getting Started Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
                    Everything you need to know to get started with Eventure.
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                      Beginner
                    </Badge>
                    <Button variant="link" size="sm" className="px-0">
                      Read Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Creating Successful Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
                    Learn how to plan, promote and execute memorable events.
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                      Organizer
                    </Badge>
                    <Button variant="link" size="sm" className="px-0">
                      Read Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Virtual Event Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
                    Best practices for hosting engaging virtual events.
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                      Advanced
                    </Badge>
                    <Button variant="link" size="sm" className="px-0">
                      Read Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Using Analytics Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
                    How to leverage data to improve your events.
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">
                      Expert
                    </Badge>
                    <Button variant="link" size="sm" className="px-0">
                      Read Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Networking at Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
                    How to maximize networking opportunities at events.
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                      Attendee
                    </Badge>
                    <Button variant="link" size="sm" className="px-0">
                      Read Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Event Accessibility Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
                    Making your events accessible to everyone.
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                      Organizer
                    </Badge>
                    <Button variant="link" size="sm" className="px-0">
                      Read Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="contact" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Get help from our support team if you couldn't find the answers you need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <Mail className="h-8 w-8 text-primary mb-3" />
                      <h3 className="font-medium mb-1">Email Support</h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                        Send us a message anytime
                      </p>
                      <p className="text-sm font-medium">support@eventure.com</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <Phone className="h-8 w-8 text-green-500 mb-3" />
                      <h3 className="font-medium mb-1">Phone Support</h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                        Mon-Fri, 9AM-5PM ET
                      </p>
                      <p className="text-sm font-medium">(555) 123-4567</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <MessageCircle className="h-8 w-8 text-blue-500 mb-3" />
                      <h3 className="font-medium mb-1">Live Chat</h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                        Get immediate assistance
                      </p>
                      <Button size="sm">Start Chat</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Send Us a Message</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input placeholder="Your name" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input placeholder="Your email address" type="email" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input placeholder="What is your inquiry about?" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <textarea 
                        className="w-full min-h-[120px] border rounded-md p-2.5 bg-white dark:bg-neutral-900"
                        placeholder="Please describe your issue in detail..."
                      ></textarea>
                    </div>
                    
                    <Button>Send Message</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}