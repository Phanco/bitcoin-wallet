import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const MNEMONICS = process.env["MNEMONIC"].split(",");
export const DERIVATION_PATHS = process.env["DERIVATION_PATH"].split(",");
export const PASSPHRASES = process.env["PASSPHRASE"].split(process.env["PASSPHRASE_DELIMITER"]);

if (!MNEMONICS) {
    logger.error("No client secret. Set MNEMONIC environment variable.");
    process.exit(1);
}

if (!DERIVATION_PATHS) {
    logger.error("No client secret. Set DERIVATION_PATH environment variable.");
    process.exit(1);
}

if (!PASSPHRASES) {
    logger.error("No client secret. Set PASSPHRASE environment variable.");
    process.exit(1);
}

if (MNEMONICS.length !== DERIVATION_PATHS.length || DERIVATION_PATHS.length !== PASSPHRASES.length) {
    logger.error("Length not match! Please check you .env and make sure mnemonics, paths and passphrases have matching length");
    process.exit(1);
}
