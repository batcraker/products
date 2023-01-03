import express from "express";
import cors from "cors"
import morgan from "morgan";
import { createRoles } from "./libs/initializeSetup";
import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import indexRoutes from "./routes/index.routes"
import "./database";
import path from "path";

const app = express();
createRoles();

app.use(cors('*'))
app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, '../frontend/dist')))
app.use(express.json());
app.use("/", indexRoutes)
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
