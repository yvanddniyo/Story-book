const express = require("express");
const router = express.Router();
const Story = require("../models/Story");
const { ensureAuth } = require("../middleware/auth");

// @desc Show add page
//@route GET /stories/add

router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});
// @desc Process add from
//@route POST /stories

router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});

module.exports = router;
