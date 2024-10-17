const express = require("express");
const app = express();
const router = require("./routes");
app.use("/api/v1/database", router.databaseBackupRoute);

app.get("/connection", (req, res) => {
  console.log("hello");
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
