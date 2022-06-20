const express = require("express");
const User = require("../models/user.model.js");

const router = express.Router();
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(400).json("Error:" + error));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json("User Added!"))
    .catch((error) => res.status(400).json("Error:" + error));
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.username = req.body.username;
      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((error) => res.status(400).json("Error:" + error));
    })
    .catch((error) => res.status(400).json("Error:" + error));
})

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((User) => res.json(User))
    .catch((error) => res.status(400).json("Error:" + error));
});
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User Deleted!"))
    .catch((error) => res.status(400).json("Error:" + error))
});

module.exports = router
