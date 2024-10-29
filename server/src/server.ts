import sequelize from "./config/connection.js";
import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";

// Recreate __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const forceDatabaseRefresh = false;

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from Vite build output - new resolve allows for static changes
// serves static files in the entire client's dist folder
app.use(express.static("../client/dist"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Allow cross-origin requests from the frontend for testing because we have a proxy setup in the frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin on my vite build
    methods: ["GET", "POST", "PUT", "DELETE"], // If we dont use a method, we shouldnt list it
    allowedHeaders: ["Content-Type", "Authorization"], // This is the default - if we have auth headers enablded
    // credentials: true, // Turn on when we get JWT and auth headers goiing
  })
);

// Catch-all handler to serve React routes
// app.get("*", (_req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
// });
// This ensures that every non-API route (e.g., /home, /chat, /profile) will
// be routed to the App's index.html. React Router will take over from there
// and render the correct component based on the route.

// connect to the database before starting up the express.js server
sequelize
  .sync({ force: forceDatabaseRefresh })
  .then(() => {
    console.log("Connected to the catgpt database successfully");
    app.listen(PORT, () => {
      console.log(`Server is listening on port:`, PORT);
    });
  })
  .catch((error) => {
    console.error("Error syncing the database: ", error);
  });
