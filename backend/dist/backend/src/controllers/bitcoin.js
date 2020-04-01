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
const bitcoin = __importStar(require("bitcoinjs-lib"));
const response_1 = require("../../../wallet/src/util/response");
const _getPubKey = (index) => {
    const publicKeyes = secrets_1.PUBKEY;
    if (index >= publicKeyes.length) {
        throw "INVALID_INDEX";
    }
    return publicKeyes[index];
};
exports.newAddress = (req, res) => {
    const { keyIndex, pathIndex, count = 1 } = req.query;
    const addresses = [];
    try {
        const network = bitcoin.networks.bitcoin;
        const extendedPubKey = _getPubKey(keyIndex);
        const node = bitcoin.bip32.fromBase58(extendedPubKey, network);
        for (let i = 0; i < count; i++) {
            const index = +pathIndex + i;
            const pubkey = node.derivePath(index.toString()).publicKey;
            addresses.push({
                index,
                address: bitcoin.payments.p2wpkh({ pubkey, network }).address,
                addressLegacy: bitcoin.payments.p2sh({ redeem: bitcoin.payments.p2wpkh({ pubkey, network }) }).address
            });
        }
        return response_1.responseOK(res, addresses);
    }
    catch (err) {
        return response_1.responseError(res, 400, err);
    }
};
exports.newMultiSigAddress = (req, res) => {
    const { n: nRaw, m: mRaw, keyIndexes: keyIndexesRaw, pathIndexes: pathIndexesRaw, count = 1 } = req.query;
    const n = parseFloat(nRaw);
    const m = parseFloat(mRaw);
    if (m > n) {
        return response_1.responseError(res, 400, "m must be less-than-or-equal n");
    }
    try {
        const extendedPubKeys = keyIndexesRaw.split(",").map(index => _getPubKey(parseInt(index)));
        const pathIndexes = pathIndexesRaw.split(",").map(index => parseInt(index));
        const pubkeys = extendedPubKeys
            .map((pubkey, index) => bitcoin
            .bip32
            .fromBase58(pubkey, bitcoin.networks.bitcoin)
            .derivePath(pathIndexes[index].toString())
            .publicKey);
        return response_1.responseOK(res, {
            m,
            n,
            pubkeys: pubkeys.map(pubkey => Buffer.from(pubkey).toString("hex")),
            address: bitcoin.payments.p2wsh({
                redeem: bitcoin.payments.p2ms({ m, pubkeys }),
            }).address,
            addressLegacy: bitcoin.payments.p2sh({
                redeem: bitcoin.payments.p2ms({ m, pubkeys })
            }).address
        });
    }
    catch (err) {
        return response_1.responseError(res, 400, err);
    }
};
exports.listAddresses = (req, res) => {
};
//# sourceMappingURL=bitcoin.js.map