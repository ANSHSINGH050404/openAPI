import express from "express";
import auth_route from "./routes/auth_route";
import apikey_route from "./routes/apikey_route";
import cors from "cors";
const app = express();


app.use(cors())
app.use(express.json());
app.use("/api/v1/auth", auth_route);
app.use("/api/v1/apikey", apikey_route);


app.get("/", (req, res) => {
  res.send("Hello World! From Bun");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});