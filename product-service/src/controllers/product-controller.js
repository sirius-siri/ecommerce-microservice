const Product = require("../models/Product");
const { productCreated } = require("../publishers/product-publisher");

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        // 1. Save to Database
        const product = await Product.create({
            name,
            price,
            description
        });

        console.log("Product saved to DB:", product._id);

        // 2. Publish Event
        await productCreated(product);

        res.status(201).json({
            message: "Product created and event published!",
            product
        });
    } catch (err) {
        console.error("Create Product Error:", err);
        res.status(500).json({ message: "Error in creating product" });
    }
};
