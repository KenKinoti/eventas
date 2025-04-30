import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { 
  insertEventSchema, 
  insertCategorySchema, 
  insertVenueSchema, 
  insertRegistrationSchema 
} from "@shared/schema";
import { nanoid } from "nanoid";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Events routes
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Error fetching events" });
    }
  });

  app.get("/api/events/recommended", async (req, res) => {
    try {
      const events = await storage.getRecommendedEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Error fetching recommended events" });
    }
  });

  app.get("/api/events/upcoming", async (req, res) => {
    try {
      const events = await storage.getUpcomingEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Error fetching upcoming events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(parseInt(req.params.id));
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Error fetching event" });
    }
  });

  app.post("/api/events", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Must be logged in to create events" });
    }

    try {
      const validData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent({
        ...validData,
        organizerId: req.user.id
      });
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: "Invalid event data" });
    }
  });

  // Categories routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Error fetching categories" });
    }
  });

  // Venues routes
  app.get("/api/venues", async (req, res) => {
    try {
      const venues = await storage.getAllVenues();
      res.json(venues);
    } catch (error) {
      res.status(500).json({ error: "Error fetching venues" });
    }
  });

  app.get("/api/venues/featured", async (req, res) => {
    try {
      const venues = await storage.getFeaturedVenues();
      res.json(venues);
    } catch (error) {
      res.status(500).json({ error: "Error fetching featured venues" });
    }
  });

  // Registrations and tickets
  app.post("/api/events/:id/register", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Must be logged in to register for events" });
    }

    try {
      const eventId = parseInt(req.params.id);
      const event = await storage.getEvent(eventId);
      
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      
      // Generate a unique ticket code using nanoid
      const ticketCode = nanoid(10);
      
      const registration = await storage.createRegistration({
        userId: req.user.id,
        eventId,
        status: "confirmed",
        ticketCode
      });
      
      res.status(201).json(registration);
    } catch (error) {
      res.status(500).json({ error: "Error registering for event" });
    }
  });

  app.get("/api/user/registrations", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Must be logged in to view registrations" });
    }

    try {
      const registrations = await storage.getUserRegistrations(req.user.id);
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user registrations" });
    }
  });

  // Initialize the HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
