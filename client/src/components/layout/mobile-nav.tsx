import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { Home, Grid, Calendar, User } from "lucide-react";

export function MobileNav() {
  const [location] = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Explore", href: "/explore", icon: Grid },
    { name: "Events", href: "/my-events", icon: Calendar },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="md:hidden bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 fixed bottom-0 left-0 right-0 z-40">
      <div className="flex justify-around">
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div
                className="flex flex-col items-center py-3 px-4 cursor-pointer"
              >
                <item.icon
                  className={cn(
                    "h-6 w-6",
                    isActive
                      ? "text-primary"
                      : "text-neutral-500 dark:text-neutral-400"
                  )}
                />
                <span
                  className={cn(
                    "text-xs mt-1",
                    isActive
                      ? "text-primary"
                      : "text-neutral-500 dark:text-neutral-400"
                  )}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function MobileHeader() {
  return (
    <header className="md:hidden bg-white dark:bg-neutral-800 p-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Calendar className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-heading font-bold text-primary dark:text-primary-foreground">Eventure</h1>
      </div>
    </header>
  );
}

export function FloatingActionButton() {
  return (
    <div className="md:hidden fixed bottom-20 right-6 z-50">
      <Link href="/create-event">
        <div className="bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg transition-colors duration-200 flex items-center justify-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
