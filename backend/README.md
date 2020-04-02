# Bitcoin Wallet API Server (Backend)

Convert Extended Public Key, provided by wallet, into addresses.

# Getting started
- Install dependencies
```
cd wallet
npm install
```
- Edit ```.env.example``` or make a copy to ```.env```. 
- Build and run the project
```
npm run build
npm start
```
Finally, navigate to `http://localhost:3001` and you should see the template being served and rendered locally!

## Rest API

### Generate SigWit Address(es)
#### Request
```http
GET /bitcoin/newAddress?keyIndex=1&pathIndex=0&count=100
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `keyIndex` | `integer` | **Required**. Index of pubKey, registered at .env. |
| `pathIndex` | `integer` | **Required**. First address would start from this path. |
| `count` | `integer` | **Default=1**. Number of addresses to generate. |

#### Response
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `index` | `integer` | Index used at path. |
| `address` | `string` | Segwit address in ```bech32``` format. |
| `addressLegacy` | `string` | Segwit address, wrapped by ```P2SH```.  | 

    HTTP/1.1 200 OK
    Date: Thu, 01 Apr 2020 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {
        "status": "success",
        "data": [{
            "index": 0,
            "address": "bc1q7hm5evvd5yucuetawaw8l54ny29xqzm80hla2m",
            "addressLegacy": "38MhVCvag1jLhyxBbFM9GD7ma4xkMrGmyu"
        }, {
            "index": 1,
            "address": "bc1qz466pqv3slsntg0h4l6m3cgzrk9z3ypcm4n3gz",
            "addressLegacy": "3J3JFJKxZdVkoecCxa1CSp7D9frHr2eUpC"
        }],
        "message": ""
    }

### Generate m-of-n Multisig Address
#### Request
```http
GET /bitcoin/newMultiSigAddress?m=2&keyIndexes=0,1&pathIndexes=0,0
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `m` | `integer` | **Required**. Number of singer required. Less than or equal to length of keyIndexes and pathIndexes. |
| `keyIndexes` | `string` | **Required**. Indexes of pubKey, registered at .env. Separate by ",". Equal length to pathIndexes. |
| `pathIndexes` | `string` | **Required**. Path of respective pubKeys. Separate by ",". Equal length to keyIndexes.  | 

#### Response
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `m` | `integer` | Number of singer required. |
| `n` | `integer` | Total number of singers. |
| `pubkeys` | `string[]` | List of pubkeys involved in Multisig.  | 
| `address` | `string` |  SegWit Multisig Address ```P2WSH(P2MS(m, pubkeys))```. | 
| `addressWSHLegacy` | `string` |  SegWit-P2SH Multisig Address ```P2SH(P2WSH(P2MS(m, pubkeys)))```. | 
| `address` | `addressLegacy` | Non-Segwit P2SH Multisig Address ```P2SH(P2MS(m, pubkeys))```.  | 

    HTTP/1.1 200 OK
    Date: Thu, 01 Apr 2020 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {
        "status": "success",
        "data": {
            "m": 2,
            "n": 2,
            "pubkeys": [
                "02c3f6885eade3ea6423861e798e977d4a711ec77ec1ca725a286ea599132dd510", 
                "027a4dac35b4d10e1d77c561be0f2eb03b45199eb6417cbce6b4456743abf45e8b"
            ],
            "address": "bc1qrem0sc4mc5dzqekcc5kapkacajx9w77lmhe776rmv0cjpskwg4mqagxcuh",
            "addressLegacy": "3KgyVHw7vLxePrMF2j1fuZQWx61xNdGd6V"
        },
        "message": ""
    }

