# Bitcoin Wallet API Server (Wallet)

This service exports BIP32 Extended Public Key (xpub) so that the private won't be exposed.

## Getting started
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

## Rest API

### Retrieve Extended Public Keys
#### Request
```http
GET /
```
#### Response

    HTTP/1.1 200 OK
    Date: Thu, 01 Apr 2020 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {
        "status": "success",
        "data": [{
            "path": "m/44'/0'/0'/0",
            "pubkey": "xpub6EjHFKMqXCNZX2HoB2eci5sYj4CcCUaE5TRNTLonqrqsuXuAhCLd4v9nZ8vLDqKyb65CYBiXVchfZd9pMLW2gSr3JGFf9RvWYTi7H3HYab2"
        }, {
            "path": "m/44'/0'/0'/0",
            "pubkey": "xpub6FFEvv3epGmrs6BkCf4cpgvFzgE7DCMtR2cJYhWsbvHGR5i17oWY8PGiak1m9a4jVfnArDEiYdKUqeL6KS7rnK2vG5CHJZgMQH915MhDr74"
        }],
        "message": ""
    }
