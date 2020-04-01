import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as bitcoinController from "./controllers/bitcoin";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3001);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */
app.get("/", homeController.index);

app.get("/bitcoin/newAddress", bitcoinController.newAddress);

app.get("/bitcoin/newMultiSigAddress", bitcoinController.newMultiSigAddress);


export default app;
