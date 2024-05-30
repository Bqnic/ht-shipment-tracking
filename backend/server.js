const express = require("express");
const shipmentTrackingRouter = require("./routes/shipmentTracking");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/shipmentTracking", shipmentTrackingRouter);

app.get("/", (req, res) => {
  res.redirect("/shipmentTracking");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
