import express from "express";
import "./db/conn.js"
import router from "./router/router.js";
import morgan from "morgan"
import cors from "cors";
import bodyParser from 'body-parser';


const app = express();
const port = 8000;

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json({ limit: '50mb' }));
app.use(morgan('tiny'))
app.use(bodyParser.json({ limit: '50mb' }))

app.use(express.json({ extended: false, limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))


app.use("/api", router)
app.use("/profile", router)


app.listen(port, () => {
    console.log("App is running at ", port)
})