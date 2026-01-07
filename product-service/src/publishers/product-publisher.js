const { publishEvent } = require("../utils/rabbitmq");

const productCreated = async (product) => {
    await publishEvent("PRODUCT_CREATED", product);

};

module.exports = { productCreated };
