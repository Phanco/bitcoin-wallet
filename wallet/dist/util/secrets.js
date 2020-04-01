"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
if (fs_1.default.existsSync(".env")) {
    logger_1.default.debug("Using .env file to supply config environment variables");
    dotenv_1.default.config({ path: ".env" });
}
else {
    logger_1.default.debug("Using .env.example file to supply config environment variables");
    dotenv_1.default.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}
exports.ENVIRONMENT = process.env.NODE_ENV;
const prod = exports.ENVIRONMENT === "production"; // Anything else is treated as 'dev'
exports.MNEMONICS = process.env["MNEMONIC"].split(",");
exports.DERIVATION_PATHS = process.env["DERIVATION_PATH"].split(",");
exports.PASSPHRASES = process.env["PASSPHRASE"].split(process.env["PASSPHRASE_DELIMITER"]);
if (!exports.MNEMONICS) {
    logger_1.default.error("No client secret. Set MNEMONIC environment variable.");
    process.exit(1);
}
if (!exports.DERIVATION_PATHS) {
    logger_1.default.error("No client secret. Set DERIVATION_PATH environment variable.");
    process.exit(1);
}
if (!exports.PASSPHRASES) {
    logger_1.default.error("No client secret. Set PASSPHRASE environment variable.");
    process.exit(1);
}
if (exports.MNEMONICS.length !== exports.DERIVATION_PATHS.length || exports.DERIVATION_PATHS.length !== exports.PASSPHRASES.length) {
    logger_1.default.error("Length not match! Please check you .env and make sure mnemonics, paths and passphrases have matching length");
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map