import request from "supertest";
import app from "../src/app";

describe("GET /", () => {
    it("should return correct addresses", (done) => {
        request(app).get("/bitcoin/newMultiSigAddress?m=2&keyIndexes=0,1,1&pathIndexes=0,0,0")
            .then(data => {
                // Public key can be verified at https://iancoleman.io/bip39/
                // Address can be verified at https://coinb.in/#newMultiSig
                expect(data.body.data.m).toBe(2);
                expect(data.body.data.n).toBe(3);
                expect(data.body.data.pubkeys.length).toBe(3);

                expect(data.body.data.pubkeys[0]).toBe("029fef721d795ee764774acf4118a8aab1cc118401cc3af9216cf3419203165ade");
                expect(data.body.data.pubkeys[1]).toBe("038fb747f0d592585dc3ffb3c160151d7fbcaaf6d45e7c7ce9eb2651bfe8fd2bb4");
                expect(data.body.data.pubkeys[2]).toBe("038fb747f0d592585dc3ffb3c160151d7fbcaaf6d45e7c7ce9eb2651bfe8fd2bb4");

                expect(data.body.data.address).toBe("bc1qs2fd50x27yv74r2ajr4fs7en3lxswy9w28ndjyx6jkp6xgwnt0xscmag5z");
                expect(data.body.data.addressWSHLegacy).toBe("3K7itjzvC8vjzg9QDbbQFJ2GbbQ8yBgmMr");
                expect(data.body.data.addressLegacy).toBe("3BRH9R7VmdJ32oSTf3EjVkPo5bBLXyU49W");

                done();
            });
    });
});
