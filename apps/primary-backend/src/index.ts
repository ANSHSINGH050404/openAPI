import express from "express";
import auth_route from "./routes/auth_route";
import apikey_route from "./routes/apikey_route";
import models_route from "./routes/models_route";
import paymentsRoutes from "./routes/payments.routes";
import cors from "cors";
import morgan from "morgan";
const app = express();


app.use(morgan("dev"))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", auth_route);
app.use("/api/v1/apikey", apikey_route);
app.use("/api/v1/models", models_route);
app.use("/payments", paymentsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World! From Bun");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});