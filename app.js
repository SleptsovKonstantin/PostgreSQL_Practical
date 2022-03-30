const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./src/models");

app.use(cors());
app.use(express.json());

require("./src/routes/index")(app);

db.sequelize.sync();  //{force: true} для удаления

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
