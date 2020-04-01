import request from "supertest";
import app from "../src/app";

describe("GET /", () => {
    it("should return 200 OK", (done) => {
        request(app).get("/")
            .expect(200, done);
    });
    it("should have success message", (done) => {
        request(app).get("/")
            .then(data => {
                expect(data.body.status).toBe("success");
                done();
            });
    });
    it("should have correct pubkey", (done) => {
        request(app).get("/")
            .then(data => {
                // Can be verified at https://iancoleman.io/bip39/
                expect(data.body.data[0].pubkey).toBe("xpub6F7q4n4unsiHB7uTXza7izZKrrwbxNTpiW576ukpxJe3XFtDJfXx2xRK11BxfAXaRtbnB8cvErMdXQZcWU3MCyPzBsPPUo3tA7cc1qGsfnk");
                expect(data.body.data[1].pubkey).toBe("xpub6DnUi8nBNFpLYgVaHAQyXeJvm6bLjMnEdCzEWrRK1ER7QnUwdZTkK9CaFH9rL2o3VQ3MCMpzoda3BEpEd2mPpqTC2TCL1cRRtwnxQ7Pw34P");

                done();
            });
    });
});
