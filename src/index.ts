import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import connectDatabase from "./config/database";
configDotenv({ path: path.join(__dirname, "/config/.env") });

// routes import
import routes from "./routes"; // import your userRoutes
import errorHandler from "./middleware/error";

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
connectDatabase();

console.log(process.env.PORT);

// Base router
const baseRouter = express.Router();

// Add user routes
baseRouter.use("/auth", routes.userRoutes);
baseRouter.use("/product", routes.productRoutes);

// Add other routes as needed
// baseRouter.use("/other", otherRoutes);

app.use("/api", baseRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
