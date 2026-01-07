const { publishEvent } = require("../utils/rabbitmq");

const productcreated = async (product) =>{
    await publishEvent("PRODUCT_CREATED",product);

};

module.exports = {productCreated};
