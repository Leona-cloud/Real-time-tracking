const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();
const gspd = require("node-gpsd");
const simulateGPSData = require("./utils/simulate-gps-data");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Logistics app is running");
});

setInterval(() => {
  const locationData = simulateGPSData();
  io.emit("location-update", locationData);
}, 5000);

io.on("connection", (socket) => {
  console.log("A user just connected");

  socket.on("locationUpdate", (data) => {
    console.log(
      `Received coordinates from client: Lat: ${data.lat}, Lng: ${data.lng}`
    );
    io.emit("locationUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
