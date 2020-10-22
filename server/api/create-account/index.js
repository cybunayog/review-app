const app = require("../../util/configureApi");
const connectDB = require("../../util/db");
const User = require("../../models/GoogleUser");

app.put("*", (req, res) => {
  connectDB()
    .then(() => {
      GoogleUser.findOneAndUpdate({email: req.body.email}, 6{
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

/**
 * Result Object {
  "accessToken": "ya29.a0AfH6SMD3SUxQIKZJfH49f9ov2w54gAT-Ak_DejSnr7TkEcDcKUu9P64ZLi1vYJZ_dDARi1VfKGp9jZhT2opXpzWB338tB17z6PVNIShkiSOiWJDLMjaTRpnvAGE2cBgj8Iv0o_SP91wIyzidpOFDD2LhRWhd7al9_DY",
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3OGFiMWRjNTkxM2Q5MjlkMzdjMjNkY2FhOTYxODcyZjhkNzBiNjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMDgyMTg5MTExMTktNDU5bDRvcDRvMGwxMDAxNHMzbGtuMDB0aWJjaTJyNjUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzMDgyMTg5MTExMTktNDU5bDRvcDRvMGwxMDAxNHMzbGtuMDB0aWJjaTJyNjUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc3MDk3MzM2NzE4NjE5MjQxMjYiLCJlbWFpbCI6ImN5YnVuYXlvZ0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ing3VG9xRUxMYThUdFZfcXpWeEotRnciLCJuYW1lIjoiQ3kgQnUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2hqeXFuSWc3LUVidlRzSHNGZmIwMHQxOHdpaldRNjJaa1VkejVWclE9czk2LWMiLCJnaXZlbl9uYW1lIjoiQ3kiLCJmYW1pbHlfbmFtZSI6IkJ1IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MDMzMjU1NjQsImV4cCI6MTYwMzMyOTE2NH0.rZlKpDTN0dgxWOK-RMtBu4ZyqN_PJkLPafn9T20xNBA739K7i9-l5PErAMMO2WZ3SZhYRYaS_WnZTYQzFv8is3i3og49OUDmq7Q-IIaGnY87LWpJQGdN6JZEwvgXaM_O-A8FP8a9IVPNnp9U-Izbv5R4l0kPXkK9JF850sKPwnq-J7DcbgwRn9t-n_M6-hSDtxRZixzPQ9vGF1x2WY5e8txDnCPR2CyThVvPQ3Xh0-fwJfrJmCB2yoJP6HmVb6rsDKETpuB2OTgZwgYQVoJkuQ4Y4u7slGYbd68AwpFLcWCvFvhpVK6If2Pa9OLoNXW8l-kgEqNTpTBdknfHkHQ3rQ",
  "refreshToken": "1//06g0FZOJAMJYoCgYIARAAGAYSNwF-L9IrD7YzxLB3ET_WYcAcswpRHSucf4zb1E93h4n-As2Ldb41CRNhCKS_JBBko-srLW_-vU4",
  "type": "success",
  "user": Object {
    "email": "cybunayog@gmail.com",
    "familyName": "Bu",
    "givenName": "Cy",
    "id": "117709733671861924126",
    "name": "Cy Bu",
    "photoUrl": "https://lh3.googleusercontent.com/a-/AOh14GhjyqnIg7-EbvTsHsFfb00t18wijWQ62ZkUdz5VrQ=s96-c",       
  },
}
 */