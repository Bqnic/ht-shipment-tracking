import express, { json } from "express";
import { shipmentTrackingRouter } from "./routes/shipmentTracking.js";
import cors from "cors";
import pkg from "body-parser";
const { urlencoded, json: _json } = pkg;

const app = express();
const PORT = 3000;

app.use(json());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(_json());
app.use("/shipmentTracking", shipmentTrackingRouter);

app.get("/", (req, res) => {
  res.redirect("/shipmentTracking");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
