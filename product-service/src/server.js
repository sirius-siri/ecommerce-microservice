require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

require("./publishers/product-publisher");

app.listen(7071, ()=> {
    console.log("Product Service running on port 7071");
});