import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCLKX2tohQTHF9Gk06XqqlT-tXUjVSOYBU";
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Chat API route
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Invalid messages array" });
        return;
      }

      const lastMessageObject = messages[messages.length - 1];
      const lastMessage = lastMessageObject?.content || "Hello";
      
      const systemInstruction = 
        "You are Clerivex Bot, a helpful, polite, and professional customer service agent for Clerivex Office Supplies. " +
        "Clerivex is a premium office supplies company serving businesses, schools, and individuals. " +
        "Contact Details:\n" +
        "- Phone: 706-300-0342\n" +
        "- Email: deshunrupert74@gmail.com\n" +
        "Key Services:\n" +
        "- Bulk Office Supply Orders (discounts apply)\n" +
        "- Business Account Management\n" +
        "- Scheduled Deliveries\n" +
        "- Custom Office Procurement Solutions\n" +
        "Response constraints:\n" +
        "- Be highly professional, helpful, and concise.\n" +
        "- Focus on encouraging user satisfaction, and guide them to browse our Categories, Contact page, or start a Business Account.\n" +
        "- Answer queries in less than 3 sentences.";

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: lastMessage,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "I'm here to assist you with any questions about our premium office supplies and business solutions.";
      res.json({ reply: responseText });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI response" });
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
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
