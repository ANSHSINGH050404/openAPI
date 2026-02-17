import express from "express";
import auth_route from "./routes/auth_route";

const app = express();

app.use(express.json());
app.use("/api/v1/auth", auth_route);


app.get("/", (req, res) => {
  res.send("Hello World! From Bun");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});