import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  Calendar, 
  User, 
  Monitor, 
  HelpCircle, 
  LogOut 
} from "lucide-react";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Explore", href: "/explore", icon: Users },
    { name: "My Events", href: "/my-events", icon: Calendar },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Live Events", href: "/live-events", icon: Monitor },
    { name: "Help", href: "/help", icon: HelpCircle },
  ];

  return (
    <aside className={cn("hidden md:flex md:flex-col md:w-64 bg-white dark:bg-neutral-800 shadow-lg", className)}>
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center space-x-2">
          <Calendar className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-heading font-bold text-primary dark:text-primary-foreground">Eventure</h1>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "flex items-center p-3 rounded-lg group cursor-pointer",
                  isActive
                    ? "bg-primary-50 dark:bg-primary-900/30 text-primary dark:text-primary-foreground"
                    : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                )}
              >
                <item.icon 
                  className={cn(
                    "h-5 w-5 mr-3",
                    isActive
                      ? "text-primary" 
                      : "text-neutral-500 dark:text-neutral-400"
                  )} 
                />
                <span className="font-medium">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      
      {user && (
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="Profile" className="h-10 w-10 rounded-full" />
              ) : (
                <User className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <p className="font-medium">{user.name || user.username}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{user.email || ""}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto" 
              onClick={() => logoutMutation.mutate()}
              aria-label="Log out"
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
}
