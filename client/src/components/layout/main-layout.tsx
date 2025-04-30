import { Sidebar } from "./sidebar";
import { MobileNav, MobileHeader, FloatingActionButton } from "./mobile-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Play } from "lucide-react";
import { Link } from "wouter";

type MainLayoutProps = {
  children: React.ReactNode;
  title?: string;
  showSearch?: boolean;
};

export function MainLayout({ children, title = "Discover Events", showSearch = true }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <MobileHeader />

        {/* Desktop header */}
        <header className="hidden md:block bg-white dark:bg-neutral-800 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold">{title}</h1>
            
            {showSearch && (
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search events, venues, or organizers..." 
                  className="w-96 pl-10"
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-neutral-400 absolute left-3 top-2.5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            )}
            
            <div className="flex space-x-4">
              <Link href="/create-event">
                <Button className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  <span>Create Event</span>
                </Button>
              </Link>
              
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-secondary rounded-full"></span>
              </Button>
              
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-neutral-50 dark:bg-neutral-900 p-4 md:p-6">
          {children}
        </main>

        <MobileNav />
        <FloatingActionButton />
      </div>
    </div>
  );
}
