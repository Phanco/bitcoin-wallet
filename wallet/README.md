# # Bitcoin Wallet API Server (Wallet)

This service exports BIP32 Extended Public Key (xpub) so that the private won't be exposed.

# Getting started
- Install dependencies
```
cd wallet
npm install
```
- Build and run the project
```
npm run build
npm start
```

Finally, navigate to `http://localhost:3000` and you should see the template being served and rendered locally!

# Rest API

## Retrieve Extended Public Keys
### Request
```http
GET /
```
### Response

    HTTP/1.1 200 OK
    Date: Thu, 01 Apr 2020 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    [{"publicKeys":[{"path":"m/44'/0'/0'/0","pubkey":"xpub6F7q4n4unsiHB7uTXza7izZKrrwbxNTpiW576ukpxJe3XFtDJfXx2xRK11BxfAXaRtbnB8cvErMdXQZcWU3MCyPzBsPPUo3tA7cc1qGsfnk"},{"path":"m/44'/0'/0'/0","pubkey":"xpub6DnUi8nBNFpLYgVaHAQyXeJvm6bLjMnEdCzEWrRK1ER7QnUwdZTkK9CaFH9rL2o3VQ3MCMpzoda3BEpEd2mPpqTC2TCL1cRRtwnxQ7Pw34P"}]}]
