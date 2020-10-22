const app = require("../../util/configureApi");
const connectDB = require("../../util/db");
const GoogleUser = require("../../models/GoogleUser");

app.put("*", (req, res) => {
  connectDB()
    .then(() => {
      GoogleUser.findOneAndUpdate({email: req.body.email}, {
        $set: {
          firstName: req.body.user.givenName,
          lastName: req.body.user.familyName,
          id: req.body.user.id,
        }
      }, function(err){

      });
    })
})

app.post("*", (req, res) => {
  connectDB()
    .then(() => {
      // Accepted, check back later
      res.sendStatus(202);
      new models.GoogleUser({
        firstName: null,
        lastName: null,
        email: req.body.email,
        id: null,
      }).save();
    });
});

app.get("*", (req, res) => {
  connectDB()
    .then(() => {
      GoogleUser.findOne({id: req.query.id}).then(function (user) {
        if (user) {
          res.json(user);
          return;
        }
        res.sendStatus(404);
      });
    });
});

module.exports = app;