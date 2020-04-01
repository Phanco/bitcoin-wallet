import { Request, Response } from "express";
import {MNEMONICS, PASSPHRASES, DERIVATION_PATHS} from "../util/secrets";
import * as bip39 from "bip39";
import * as HDKey from "hdkey";
import { responseOK, responseError } from "../util/response";

/**
 * GET /
 * return Extended Public Keys
 */
export const index = (req: Request, res: Response) => {
    const mnemonics: Array<string> = MNEMONICS;
    const paths: Array<string> = DERIVATION_PATHS;
    const passphrases: Array<string> = PASSPHRASES;

    try {
        const publicKeys: Array<any> = mnemonics.map((mnemonic, index) => {
            const seed = bip39.mnemonicToSeedSync(mnemonic, passphrases[index]);
            return {
                path: paths[index],
                pubkey: HDKey.fromMasterSeed(seed).derive(paths[index]).publicExtendedKey
            };
        });
        return responseOK(res, publicKeys);
    } catch (err) {
        return responseError(res, 400, err);
    }

};
