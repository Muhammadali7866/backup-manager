const router = require("express").Router();
const databaseConnection = require("../controllers/createDatabaseConnection.controller");

router.post("/create-conection", databaseConnection.createDatabaseConnection);
module.exports = router;
