require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const { connect } = require("mongoose");

const app = express();
app.use(express.json());

connectDB();
require("./consumer/order-consumer");

app.listen(7072, ()=>
    console.log("Order Service running")
);