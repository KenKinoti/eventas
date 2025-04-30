import { 
  users, type User, type InsertUser,
  events, type Event, type InsertEvent,
  categories, type Category, type InsertCategory,
  venues, type Venue, type InsertVenue,
  registrations, type Registration, type InsertRegistration
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Event operations
  getAllEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  getRecommendedEvents(): Promise<Event[]>;
  getUpcomingEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Category operations
  getAllCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Venue operations
  getAllVenues(): Promise<Venue[]>;
  getVenue(id: number): Promise<Venue | undefined>;
  getFeaturedVenues(): Promise<Venue[]>;
  createVenue(venue: InsertVenue): Promise<Venue>;
  
  // Registration operations
  getUserRegistrations(userId: number): Promise<Registration[]>;
  getEventRegistrations(eventId: number): Promise<Registration[]>;
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private events: Map<number, Event>;
  private categories: Map<number, Category>;
  private venues: Map<number, Venue>;
  private registrations: Map<number, Registration>;
  
  sessionStore: session.SessionStore;
  currentUserId: number;
  currentEventId: number;
  currentCategoryId: number;
  currentVenueId: number;
  currentRegistrationId: number;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.categories = new Map();
    this.venues = new Map();
    this.registrations = new Map();
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    this.currentUserId = 1;
    this.currentEventId = 1;
    this.currentCategoryId = 1;
    this.currentVenueId = 1;
    this.currentRegistrationId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create categories
    const categoryData: InsertCategory[] = [
      { name: "Networking", icon: "users", color: "primary" },
      { name: "Music", icon: "music", color: "secondary" },
      { name: "Business", icon: "chart", color: "accent" },
      { name: "Arts", icon: "palette", color: "green" },
      { name: "Health", icon: "heart", color: "yellow" },
      { name: "Technology", icon: "cube", color: "red" }
    ];
    
    categoryData.forEach(cat => this.createCategory(cat));
    
    // Create venues
    const venueData: InsertVenue[] = [
      { 
        name: "The Grand Hall", 
        location: "San Francisco, CA", 
        description: "A beautiful historic venue with elegant architecture, perfect for corporate events and wedding receptions.",
        imageUrl: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3",
        capacity: 500,
        type: "Indoor",
        rating: "4.9"
      },
      { 
        name: "Lakeside Gardens", 
        location: "Portland, OR", 
        description: "Stunning outdoor venue with panoramic lake views, perfect for summer gatherings and garden parties.",
        imageUrl: "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
        capacity: 300,
        type: "Outdoor",
        rating: "4.7"
      },
      { 
        name: "Urban Loft", 
        location: "New York, NY", 
        description: "Modern industrial space with exposed brick and large windows, ideal for networking events and creative workshops.",
        imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
        capacity: 150,
        type: "Urban",
        rating: "4.8"
      }
    ];
    
    venueData.forEach(venue => this.createVenue(venue));
    
    // Create events
    const eventData: InsertEvent[] = [
      {
        title: "Tech Innovation Summit 2023",
        description: "Join the most innovative minds in tech for three days of inspiring talks, workshops, and networking opportunities.",
        date: "Sep 12-14, 2023",
        time: "9:00 AM - 5:00 PM",
        location: "San Francisco, CA",
        price: "$299",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        organizerId: undefined,
        categoryId: 6,
        venueId: 1,
        isNew: true,
        isFeatured: false
      },
      {
        title: "Summer Beats Music Festival",
        description: "Experience three days of amazing music performances from top artists across multiple genres in a beautiful outdoor setting.",
        date: "Aug 25-27, 2023",
        time: "12:00 PM - 11:00 PM",
        location: "Austin, TX",
        price: "$150",
        imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
        organizerId: undefined,
        categoryId: 2,
        venueId: 2,
        isNew: false,
        isFeatured: false
      },
      {
        title: "Startup Networking Mixer",
        description: "Connect with founders, investors, and tech professionals in a relaxed setting. Perfect for expanding your professional network.",
        date: "Jul 15, 2023",
        time: "6:00 PM - 9:00 PM",
        location: "New York, NY",
        price: "Free",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
        organizerId: undefined,
        categoryId: 1,
        venueId: 3,
        isNew: false,
        isFeatured: true
      },
      {
        title: "UX Design Workshop",
        description: "Learn practical UX design skills and methodologies from industry experts in this hands-on workshop.",
        date: "Aug 05, 2023",
        time: "10:00 AM - 4:00 PM",
        location: "San Francisco, CA",
        price: "$199",
        imageUrl: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
        organizerId: undefined,
        categoryId: 4,
        venueId: 1,
        isNew: false,
        isFeatured: false
      },
      {
        title: "AI in Healthcare Conference",
        description: "Explore the latest advancements in artificial intelligence and their applications in the healthcare industry.",
        date: "Aug 18, 2023",
        time: "9:00 AM - 5:00 PM",
        location: "Chicago, IL",
        price: "$249",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
        organizerId: undefined,
        categoryId: 6,
        venueId: 1,
        isNew: false,
        isFeatured: false
      }
    ];
    
    eventData.forEach(event => this.createEvent(event));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Event methods
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getRecommendedEvents(): Promise<Event[]> {
    // In a real app, this would have recommendation logic
    // For now, return all events marked as new or featured
    return Array.from(this.events.values()).filter(
      event => event.isNew || event.isFeatured
    );
  }

  async getUpcomingEvents(): Promise<Event[]> {
    // Return all events sorted by date (in a real app would filter by future dates)
    return Array.from(this.events.values());
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const event: Event = { ...insertEvent, id, createdAt: new Date() };
    this.events.set(id, event);
    return event;
  }

  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id, createdAt: new Date() };
    this.categories.set(id, category);
    return category;
  }

  // Venue methods
  async getAllVenues(): Promise<Venue[]> {
    return Array.from(this.venues.values());
  }

  async getVenue(id: number): Promise<Venue | undefined> {
    return this.venues.get(id);
  }

  async getFeaturedVenues(): Promise<Venue[]> {
    // In a real app, this would filter by featured field
    // For now, return all venues
    return Array.from(this.venues.values());
  }

  async createVenue(insertVenue: InsertVenue): Promise<Venue> {
    const id = this.currentVenueId++;
    const venue: Venue = { ...insertVenue, id, createdAt: new Date() };
    this.venues.set(id, venue);
    return venue;
  }

  // Registration methods
  async getUserRegistrations(userId: number): Promise<Registration[]> {
    return Array.from(this.registrations.values()).filter(
      registration => registration.userId === userId
    );
  }

  async getEventRegistrations(eventId: number): Promise<Registration[]> {
    return Array.from(this.registrations.values()).filter(
      registration => registration.eventId === eventId
    );
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = this.currentRegistrationId++;
    const registration: Registration = { ...insertRegistration, id, createdAt: new Date() };
    this.registrations.set(id, registration);
    return registration;
  }
}

export const storage = new MemStorage();
