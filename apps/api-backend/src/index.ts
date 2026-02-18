import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World! from api backend");
});

app.listen(5001, () => {
    console.log("Server started on port 5001");
});
