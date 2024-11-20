import express from "express";
import dotenv from "dotenv";
const app = express()
import user from "./routes/user.js";
import auth from "./routes/auth.js"
import connectDB from "./utils/db.js";
import cors from "cors"
import articles from "./routes/articles.js"

dotenv.config();


app.get('/', (req, res) => {
  res.send('SuccessFully Running the API')
})

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/article", articles)

app.listen(process.env.PORT, () => {
  console.log(`Server Running on PORT => ${process.env.PORT}`)
})