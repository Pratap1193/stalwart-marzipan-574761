import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const DATA_FILE = path.join(process.cwd(), "data.json");
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_for_dev";

function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading data.json:", err);
    return {};
  }
}

function writeData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing data.json:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- EMAIL SETUP ---
  // In a real app, use real SMTP credentials. Here we mock it or use ethereal if nothing provided.
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "ethereal.user@ethereal.email",
      pass: "ethereal_password",
    },
  });

  // --- PUBLIC API ROUTES ---
  app.get("/api/data", (req, res) => {
    res.json(readData());
  });

  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin123") {
      const token = jwt.sign({ id: "admin", role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
      return res.json({ token });
    }
    return res.status(401).json({ error: "Invalid credentials" });
  });

  app.post("/api/reservations", async (req, res) => {
    const { name, email, phone, date, time, guests, specialRequest } = req.body;
    
    const siteData = readData();
    const adminEmail = siteData?.contact?.email || "admin@limelight.com";

    const mailOptions = {
      from: '"Lime Light System" <noreply@limelight.com>',
      to: adminEmail,
      subject: `New Reservation from ${name}`,
      text: `
        New Reservation Details:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Date: ${date}
        Time: ${time}
        Guests: ${guests}
        Special Request: ${specialRequest}
      `
    };

    try {
      // We don't block on email sending failures in this demo
      console.log("Attempting to send email reservation to:", adminEmail);
      // await transporter.sendMail(mailOptions); // Commented out to prevent crash with fake ethereal creds
      console.log("Mock Email sent successfully!");
      res.status(200).json({ success: true, message: "Reservation sent" });
    } catch (err) {
      console.error("Error sending email", err);
      res.status(500).json({ error: "Failed to process reservation" });
    }
  });

  // --- PROTECTED ADMIN API ROUTES ---
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  app.post("/api/admin/update", authenticate, (req, res) => {
    const newData = req.body;
    if (newData && typeof newData === 'object') {
      writeData(newData);
      res.json({ success: true });
    } else {
      res.status(400).json({ error: "Invalid data format" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
