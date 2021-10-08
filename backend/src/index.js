import express from "express";
import cors from "cors";
import path from "path";

import { DB } from "./db/mongoose.js";
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import storeRoutes from "./routes/stores.js";
import userRoutes from "./routes/users.js";
import bidRoutes from "./routes/bids.js";
import mpesaRoutes from "./routes/mpesa.js";
import authRoutes from "./routes/auth.js";
import {errorHandler} from "./_helpers/error/error-handler.js";
import ErrorRes from "./_helpers/error/ErrorResponse.js";
import chalk from "chalk";
import { fileURLToPath } from "url";
import fs from "fs";
import http from "http";
import https from "https";
import cron from "node-cron";
import { updateBidabbles } from "./controllers/bids.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


var options = {
  key: fs.readFileSync('certificates/private.key'),
  cert: fs.readFileSync('certificates/certificate.crt'),
  ca: fs.readFileSync('certificates/ca_bundle.crt')
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

const PORT = process.env.PORT || 5000;

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/stores", storeRoutes);
app.use("/users", userRoutes);
app.use("/bids", bidRoutes);
app.use("/mpesa", mpesaRoutes);
app.all("*", (req, res, next) => {
  next(new ErrorRes('Requested resource not found', 404));
});
//cron
// Schedule tasks to be run on the server.
cron.schedule('* * * * *', function() {
  const ups = updateBidabbles();
});
//.cron
var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

app.use(errorHandler);

DB.on("connected", function () {
  console.log(chalk.rgb(208, 60, 240)("DB is connected"));
  httpsServer.listen(PORT, () =>
    console.log(chalk.rgb(208, 60, 240)(`Server listening on port: ${PORT}`))
  );
});

