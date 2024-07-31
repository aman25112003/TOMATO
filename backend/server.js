//IMPORT EXPRESS
import express from "express";
import cors from "cors";
import { connectDB } from "./config/Database.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
//APP CONFIGURATION
const app = express();

//DEFINE PORT NUMBER
const PORT = process.env.PORT || 4000;

//MIDDLEWARES
app.use(express.json());
app.use(cors());

//DATABASE CONNECTION
connectDB();

//API ENDPOINTS ROUTES {ROUTING}
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
//DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("API working!!!");
});

//RUN THE SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
