"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_1 = require("../util/secrets");
const bip39 = __importStar(require("bip39"));
const HDKey = __importStar(require("hdkey"));
const response_1 = require("../util/response");
/**
 * GET /
 * return Extended Public Keys
 */
exports.index = (req, res) => {
    const mnemonics = secrets_1.MNEMONICS;
    const paths = secrets_1.DERIVATION_PATHS;
    const passphrases = secrets_1.PASSPHRASES;
    try {
        const publicKeys = mnemonics.map((mnemonic, index) => {
            const seed = bip39.mnemonicToSeedSync(mnemonic, passphrases[index]);
            return {
                path: paths[index],
                pubkey: HDKey.fromMasterSeed(seed).derive(paths[index]).publicExtendedKey
            };
        });
        return response_1.responseOK(res, publicKeys);
    }
    catch (err) {
        return response_1.responseError(res, 400, err);
    }
};
//# sourceMappingURL=home.js.map