var friends = require("../data/friends.js");

module.exports = function (app) {
    // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });
    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post("/api/friends", function(req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        console.log(req.body);

        // Take the result of the user's survey POST and parse it
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        // This variable will calculate the difference b/w the user's scores and the scores of each user in the db
        var totalDifference = 0;

        // Loop through all the friend possibilities in the db:
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            totalDifference = 0;
            // Then loop through all the scores of each friend:
            for (var j = 0; j < friends[i].scores[j]; j++) {
                // Calculate the difference b/w the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                // If the sum of differences is less than the differences of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {
                    // Reset the bestMatch to new friend:
                    bestMatch.name  = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        // Save the user's data to the db (this has to happen after the check; otherwise, the db will always return that the user is the user's best friend)
        friends.push(userData);
        // Return a json with the user's bestmatch. this will be used by the html.
        res.json(bestMatch);
    })

};



