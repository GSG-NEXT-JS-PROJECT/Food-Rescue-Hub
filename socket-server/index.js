/* eslint-disable @typescript-eslint/no-require-imports */
const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/emit-notification") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { userId, type, notification } = JSON.parse(body);
        if (!userId || !notification) {
          throw new Error("Missing userId or notification");
        }
        console.log(
          `Received HTTP request to emit notification to ${userId}:`,
          { type, notification }
        );
        io.to(`user:${userId}`).emit("notification", notification);
        console.log(
          `Emitted notification to room user:${userId}, type: ${type}`
        );
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Notification emitted" }));
      } catch (error) {
        console.error("Error parsing notification request:", error);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid request" }));
      }
    });
  } else if (req.method === "POST" && req.url === "/emit-donation-update") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { donation } = JSON.parse(body);
        console.log("Received HTTP request to emit donation update:", donation);
        io.to("donations").emit("donation-update", donation);
        console.log("Emitted donation update to donations room");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Donation update emitted" }));
      } catch (error) {
        console.error("Error parsing donation update request:", error);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid request" }));
      }
    });
  } else if (req.method === "POST" && req.url === "/emit-donation-deleted") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { donationId } = JSON.parse(body);
        if (!donationId) {
          throw new Error("Missing type or donationId");
        }
        console.log("Received HTTP request to emit donation-deleted:", {
          donationId,
        });
        io.to("donations").emit("donation-deleted", { donationId });
        console.log(
          `Emitted donation-deleted to donations room: ${donationId}`
        );
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Donation-deleted emitted" }));
      } catch (error) {
        console.error("Error parsing donation-deleted request:", error);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid request" }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

const io = new Server(server, {
  cors: {
    origin: process.env.NEXTJS_APP_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(`user:${userId}`);
    console.log(`User ${userId} joined room user:${userId}`);
  });

  socket.on("join-donations", () => {
    socket.join("donations");
    console.log("Client joined donations room:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Socket.IO server running on port ${port}`);
});
