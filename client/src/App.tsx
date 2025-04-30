import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import ExplorePage from "@/pages/explore-page";
import MyEventsPage from "@/pages/my-events-page";
import ProfilePage from "@/pages/profile-page";
import LiveEventsPage from "@/pages/live-events-page";
import HelpPage from "@/pages/help-page";
import EventsPage from "@/pages/events-page";
import VenuesPage from "@/pages/venues-page";
import CreateEventPage from "@/pages/create-event-page";
import { ProtectedRoute } from "@/lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/explore" component={ExplorePage} />
      <ProtectedRoute path="/my-events" component={MyEventsPage} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <ProtectedRoute path="/live-events" component={LiveEventsPage} />
      <ProtectedRoute path="/help" component={HelpPage} />
      <ProtectedRoute path="/events" component={EventsPage} />
      <ProtectedRoute path="/venues" component={VenuesPage} />
      <ProtectedRoute path="/create-event" component={CreateEventPage} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
