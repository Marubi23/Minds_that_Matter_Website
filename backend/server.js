import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

import parentRoutes from "./Routes/parentAuth.js";
import psychiatristRoutes from "./Routes/psychiatrist.js";
import studentRoutes from "./Routes/student.js";
import notificationRoutes from "./Routes/notifications.js";
import mailRoutes from "./Routes/mail.js";

app.use("/api/parents", parentRoutes);
app.use("/api/psychiatrist", psychiatristRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/mail", mailRoutes);

app.get("/", (req, res) => res.send("Welcome to Minds That Matter Backend - Supabase"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
