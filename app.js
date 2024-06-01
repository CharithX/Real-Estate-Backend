import express from "express"
import authRoute from "./routes/auth.route.js"

const app = express();


app.use(express.json())
app.use("/api/test", (req, res) => {
    res.send("test worked")
})

app.use("/api/auth", authRoute)


  app.listen(8800, () => {
    console.log("server is running on port 8800!");
})