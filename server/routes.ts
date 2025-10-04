import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Serve a consistent favicon for browsers that still request /favicon.ico
  app.get("/favicon.ico", (_req, res) => {
    res.redirect(302, "/favicon-32x32.png");
  });

  const httpServer = createServer(app);

  return httpServer;
}
