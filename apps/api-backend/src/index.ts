import express from "express";
import router from "./routers/route";
import cors from "cors";
import morgan from "morgan";
const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/v1', router);
app.listen(5001, () => {
    console.log("Server started on port 5001");
});