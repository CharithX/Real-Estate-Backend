import express from "express";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import { MongoClient } from "mongodb";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(cookieParser());
const url = process.env.DATABASE_URL;

// Function to connect to MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(url);
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB");
  } finally {
    // Close the connection
    await client.close();
  }
}

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

const port = process.env.PORT || 8800;
app.use("/", (req, res) => {
  res.send("API is working");
});
// Start the server and connect to MongoDB
app.listen(port, async () => {
  console.log(`server is running on port ${port}`);
  await connectToMongoDB();
});
