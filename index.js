import express from "express";
import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import serviceRoute from "./src/routes/services.route.js";
import bookingRoute from "./src/routes/booking.route.js";
import openingHoursRoute from "./src/routes/openingHours.route.js";
import connectDataBase from "./src/database/db.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
connectDataBase();
app.use(cors());
app.use(express.json());

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/services", serviceRoute);
app.use("/booking", bookingRoute);
app.use("/openingHours", openingHoursRoute);
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));