require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");

const app = express();
app.use(express.json());

connectDB();

app.use("/auth",require("./routes/auth.routes"));

app.listen(7070,() =>
console.log("Auth service running on 7070"));
