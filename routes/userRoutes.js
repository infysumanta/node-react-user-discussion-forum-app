const express = require("express");
const { getUserDetails } = require("../controllers/userController");
const { verifyAuth } = require("../middleware/auth");

const router = express.Router();

router.use(verifyAuth);

router.route("/get-user-details").get(getUserDetails);

module.exports = router;
