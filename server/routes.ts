import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Healthcheck
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  // Create user
  app.post("/api/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const user = await storage.createUser(data);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  });

  // Get user by id
  app.get("/api/users/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

  // Get user by username via query param
  app.get("/api/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usernameParam = req.query.username;
      if (typeof usernameParam !== "string" || usernameParam.trim().length === 0) {
        return res.status(400).json({ message: "username query param required" });
      }
      const user = await storage.getUserByUsername(usernameParam);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
