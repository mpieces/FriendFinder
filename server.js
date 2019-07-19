// DEPENDENCIES
var express = require("express");
var path = require("path");
var app = express();

// PORT
var PORT = process.env.PORT || 8080;

// PARSE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
require("./app/routing/apiRoutes.js")(app);
require ("./app/routing/htmlRoutes.js")(app);

// LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  