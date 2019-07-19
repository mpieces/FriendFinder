// DEPENDENCIES
var path = require("path");

// ROUTING
// 2 paths inside a module exports fxn so can include them in the server
module.exports = function(app) {
  
    // A GET Route to /survey which should display the survey page.
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/survey.html"));
    });
    // A default, catch-all route that leads to home.html which displays the home page.
    app.use(function(req,res) {
        res.sendFile(path.join(__dirname + "/../public/home.html"));
    });
};



