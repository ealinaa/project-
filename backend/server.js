import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'

//app config

const app = express()
const port = 8000

//middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

//api endpoint

app.use("/api/food",foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
    res.send("Connected Successfully")
})

app.listen(port,() => {
    console.log(`Server Connected sucessfully on port:${port}`)
})