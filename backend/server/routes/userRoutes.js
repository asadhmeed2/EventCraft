const express = require("express");
const router = express.Router();
const { userDetails } = require(".../controllers/user")

router.route("/details").post(userDetails);

module.exports = router;