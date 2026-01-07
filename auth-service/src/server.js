require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");

const app = express();
app.use(express.json());

app.use("/auth", require("./routes/auth-routes"));

const PORT = process.env.PORT || 7070;

const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Auth service running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};

startServer();
