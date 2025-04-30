import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  PlayCircle, 
  Calendar, 
  MapPin, 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  BarChart3, 
  Share2,
  AlertCircle 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export default function LiveEventsPage() {
  const [activeTab, setActiveTab] = useState("live");
  const [chatMessage, setChatMessage] = useState("");
  
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to a chat system
    console.log("Chat message:", chatMessage);
    setChatMessage("");
  };
  
  const chatMessages = [
    { id: 1, user: "Jane Cooper", message: "This is such a great presentation! 👏", time: "2 min ago", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
    { id: 2, user: "Robert Fox", message: "Can someone explain the last point in more detail?", time: "1 min ago", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
    { id: 3, user: "Wade Warren", message: "Looking forward to the Q&A session", time: "Just now", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
  ];

  return (
    <MainLayout title="Live Events" showSearch={false}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="live">Live Now</TabsTrigger>
          <TabsTrigger value="upcoming">Starting Soon</TabsTrigger>
          <TabsTrigger value="previous">Previous</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {activeTab === "live" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Event Stream */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="relative bg-black aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <PlayCircle className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-medium mb-2">Tech Innovation Summit 2023 - Live Stream</h3>
                    <p className="text-neutral-400">Click to join the livestream</p>
                  </div>
                </div>
                <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0">LIVE</Badge>
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                  1,245 watching
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Tech Innovation Summit 2023</h2>
                    <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Jul 15, 2023</span>
                      <span className="mx-2">•</span>
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Virtual Event</span>
                    </div>
                  </div>
                  <Button>Join Live</Button>
                </div>
                
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Join industry leaders as they discuss the latest trends and innovations in technology.
                  This session focuses on AI advancements and their practical applications in business.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="outline" className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200">
                    Technology
                  </Badge>
                  <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                    AI
                  </Badge>
                  <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                    Innovation
                  </Badge>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9 mr-2">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/85.jpg" alt="Host" />
                      <AvatarFallback>TC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">TechCorp Inc.</p>
                      <p className="text-xs text-neutral-500">Host</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Like
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Event Schedule</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 text-sm text-neutral-500">09:00 AM</div>
                    <div>
                      <p className="font-medium">Welcome and Introduction</p>
                      <p className="text-sm text-neutral-500">John Smith, CEO</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 text-sm text-neutral-500">09:15 AM</div>
                    <div>
                      <p className="font-medium">Keynote: The Future of AI</p>
                      <p className="text-sm text-neutral-500">Dr. Sarah Johnson</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 text-sm text-neutral-500">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-0">Current</Badge>
                    </div>
                    <div className="border-l-2 border-primary pl-4 py-1">
                      <p className="font-medium text-primary">Panel Discussion: AI in Business</p>
                      <p className="text-sm text-neutral-500">Panel of Industry Experts</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 text-sm text-neutral-500">11:00 AM</div>
                    <div>
                      <p className="font-medium">Break</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 text-sm text-neutral-500">11:15 AM</div>
                    <div>
                      <p className="font-medium">Workshop: Practical AI Implementation</p>
                      <p className="text-sm text-neutral-500">Technical Team</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 text-sm text-neutral-500">12:30 PM</div>
                    <div>
                      <p className="font-medium">Q&A Session</p>
                      <p className="text-sm text-neutral-500">All Speakers</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <h3 className="font-semibold flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Live Chat
                  </h3>
                </div>
                
                <div className="h-[calc(60vh-240px)] overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={message.avatar} alt={message.user} />
                        <AvatarFallback>{message.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{message.user}</span>
                          <span className="text-xs text-neutral-500">{message.time}</span>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t">
                  <form onSubmit={handleChatSubmit} className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="sm">Send</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Attendees (245)
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" alt="Jane Cooper" />
                      <AvatarFallback>JC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">Jane Cooper</p>
                      <p className="text-xs text-neutral-500">Product Manager</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/45.jpg" alt="Robert Fox" />
                      <AvatarFallback>RF</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">Robert Fox</p>
                      <p className="text-xs text-neutral-500">Developer</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src="https://randomuser.me/api/portraits/women/45.jpg" alt="Esther Howard" />
                      <AvatarFallback>EH</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">Esther Howard</p>
                      <p className="text-xs text-neutral-500">Designer</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/22.jpg" alt="Wade Warren" />
                      <AvatarFallback>WW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">Wade Warren</p>
                      <p className="text-xs text-neutral-500">Marketing</p>
                    </div>
                  </div>
                  
                  <div className="text-center pt-2">
                    <Button variant="link" size="sm">View All</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Live Polls
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="font-medium mb-2">What AI tool do you use most?</p>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>ChatGPT</span>
                          <span>42%</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Google Bard</span>
                          <span>28%</span>
                        </div>
                        <Progress value={28} className="h-2" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Microsoft Copilot</span>
                          <span>15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Other</span>
                          <span>15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">1,245 votes • Poll closed</p>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-2">How do you plan to implement AI in your business?</p>
                    <Button variant="outline" size="sm" className="w-full mb-2">Customer Service</Button>
                    <Button variant="outline" size="sm" className="w-full mb-2">Content Creation</Button>
                    <Button variant="outline" size="sm" className="w-full mb-2">Data Analysis</Button>
                    <Button variant="outline" size="sm" className="w-full">Other</Button>
                    <p className="text-xs text-neutral-500 mt-2">Poll open • 234 votes so far</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : activeTab === "upcoming" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3).fill(0).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video relative bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                <img 
                  src={`https://source.unsplash.com/random/600x400?conference,${i}`} 
                  alt="Event thumbnail" 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <Badge className="mb-2 bg-green-500 text-white border-0">Starting Soon</Badge>
                  <h3 className="text-lg font-bold text-white">
                    {i === 0 ? "Virtual Product Launch: NextGen Headphones" : 
                     i === 1 ? "Data Science Workshop 2023" : 
                     "Business Leadership Conference"}
                  </h3>
                  <p className="text-sm text-white mt-1">
                    Starts in {i === 0 ? "15 minutes" : i === 1 ? "1 hour" : "3 hours"}
                  </p>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{`${i === 0 ? "Today" : i === 1 ? "Today" : "Today"}, ${["3:00 PM", "4:00 PM", "6:00 PM"][i]} EST`}</span>
                  <span className="mx-2">•</span>
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Virtual Event</span>
                </div>
                
                <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 line-clamp-2">
                  {i === 0 ? 
                   "Join us for the exclusive launch of our revolutionary headphones with spatial audio technology." : 
                   i === 1 ? 
                   "Learn practical data science techniques from industry experts in this interactive workshop." : 
                   "Connect with business leaders and gain insights on effective leadership strategies in the digital age."}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${30 + i}.jpg`} alt="Host" />
                      <AvatarFallback>H</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{["TechGear", "DataScience Co.", "Business Leaders Network"][i]}</span>
                  </div>
                  <Button size="sm">Set Reminder</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-neutral-50 dark:bg-neutral-800/30 rounded-lg">
          <AlertCircle className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No Previous Live Events</h3>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md mx-auto">
            Previous live events will appear here after they've concluded. Check the "Live Now" or "Starting Soon" tabs for current events.
          </p>
          <Button onClick={() => setActiveTab("live")}>See Live Events</Button>
        </div>
      )}
    </MainLayout>
  );
}