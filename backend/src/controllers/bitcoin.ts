import { Request, Response } from "express";
import { PUBKEY } from "../util/secrets";
import * as bitcoin from "bitcoinjs-lib";
import { BIP32Interface } from "bitcoinjs-lib";
import { responseOK, responseError } from "../util/response";

const _getPubKey = (index: number) => {
    const publicKeyes: Array<string> = PUBKEY;
    if (index >= publicKeyes.length) {
        throw "INVALID_INDEX";
    }
    return publicKeyes[index];
};

interface NewAddressInterface {
    keyIndex: number;
    pathIndex: number;
    count: number;
}
export const newAddress = (req: Request, res: Response) => {
    const { keyIndex, pathIndex, count = 1 }: NewAddressInterface = req.query;
    const addresses = [];
    try {
        const network = bitcoin.networks.bitcoin;
        const extendedPubKey = _getPubKey(keyIndex);
        const node: BIP32Interface = bitcoin.bip32.fromBase58(extendedPubKey, network);
        for (let i = 0; i < count; i++) {
            const index = +pathIndex + i;
            const pubkey = node.derivePath(index.toString()).publicKey;
            addresses.push({
                index,
                address: bitcoin.payments.p2wpkh({ pubkey, network }).address,
                addressLegacy: bitcoin.payments.p2sh({ redeem: bitcoin.payments.p2wpkh({ pubkey, network }) }).address
            });
        }
        return responseOK(res, addresses);
    } catch (err) {
        return responseError(res, 400, err);
    }
};

export const newMultiSigAddress = (req: Request, res: Response) => {
    const { n: nRaw, m: mRaw, keyIndexes: keyIndexesRaw, pathIndexes: pathIndexesRaw, count = 1 } = req.query;
    try {
        const n = parseFloat(nRaw);
        const m = parseFloat(mRaw);
        if ( m > n ) {
            throw "m must be less-than-or-equal n";
        }

        const extendedPubKeys = keyIndexesRaw.split(",").map(index => _getPubKey(parseInt(index)));
        const pathIndexes = pathIndexesRaw.split(",").map(index => parseInt(index));
        const pubkeys = extendedPubKeys
            .map((pubkey, index) =>
                bitcoin
                    .bip32
                    .fromBase58(pubkey, bitcoin.networks.bitcoin)
                    .derivePath(pathIndexes[index].toString())
                    .publicKey
            );
        return responseOK(res, {
            m,
            n,
            pubkeys: pubkeys.map(pubkey => Buffer.from(pubkey).toString("hex")),
            address : bitcoin.payments.p2wsh({
                redeem: bitcoin.payments.p2ms({ m, pubkeys }),
            }).address,
            addressLegacy: bitcoin.payments.p2sh({
                redeem: bitcoin.payments.p2wsh({
                    redeem: bitcoin.payments.p2ms({ m, pubkeys })
                })
            }).address
        });
    } catch (err) {
        return responseError(res, 400, err);
    }

};

export const listAddresses = (req: Request, res: Response) => {

};

