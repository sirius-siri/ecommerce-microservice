require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

connectDB();
require("./publishers/product-publisher");
app.use("/product", require("./routes/product-routes"));

const PORT = 7071;
app.listen(PORT, () => {
    console.log(`Product Service running on port ${PORT}`);
});