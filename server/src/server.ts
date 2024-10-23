import sequelize from "./config/connection.js";
import express from "express";
import routes from "./routes/index.js";
import cors from "cors";

const forceDatabaseRefresh = false;

const app = express();
const PORT = process.env.PORT || 3001;

// serves static files in the entire client's dist folder
app.use(express.static("../client/dist"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Allow cross-origin requests from the frontend for testing because we have a proxy setup in the frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with frontend origin
    methods: ["GET", "POST"], // Specify allowed methods
    allowedHeaders: ["Content-Type"],
  })
);

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
