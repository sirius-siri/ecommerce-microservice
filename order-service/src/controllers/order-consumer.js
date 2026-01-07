const {consumeEvent} = require("../utils/rabbitmq");

consumeEvent("USER_CREATED",data => {
    console.log("Order Service received USER_CREATED",data);
});

consumeEvent("PRODUCT_CREATED",data => {
    console.log("Order Service received PRODUCT_CREATED",data);
});