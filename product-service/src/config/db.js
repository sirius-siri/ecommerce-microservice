const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Product DB Connected");
    } catch (err) {
        console.error("Product DB connection error:", err.message);
    }
};

module.exports = connectDB;
