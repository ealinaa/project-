import express from "express";
import cors from "cors"


//app config

const app = express()
const port = 8000

//middleware
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Connected Successfully")
})

app.listen(port,() => {
    console.log(`Server Connected sucessfully on port:${port}`)
})