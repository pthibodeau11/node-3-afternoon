require("dotenv").config();

const express = require("express");
const massive = require("massive");
const { SERVER_PORT, CONNECTION_STRING } = process.env;
const app = express();
const products_controller = require("./products_controller");

massive(CONNECTION_STRING)
  .then(dbInstance => {
    //executing some logic when promise is fulfilled
    app.set("db", dbInstance); // capturing the database instance in the first parameter // now that we have dbInstance, we can set it onto app. // function returns app.set('db', dbInstance)
  })
  .catch(err => console.log(err));

app.use(express.json());

app.post("/api/products", products_controller.create);
app.get("/api/products", products_controller.getAll);
app.get("/api/products/:id", products_controller.getOne);
app.put("/api/products/:id", products_controller.update);
app.delete("/api/products/:id", products_controller.delete);

app.listen(SERVER_PORT, () =>
  console.log(`Server is listening on ${SERVER_PORT}`)
);
