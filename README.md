# Ethereum Address Generator - Node

Generate private key and its associated ethereum address

## Getting Started

These instructions will provide you a copy of the module and run in your application so that the clients can create their own private keys and ethereum compliance addresses.

### Prerequisites

```
node: ">=4.2.4"
npm
```

### Installation

```
npm install node-eth-address --save
```

## Usage

### getDefaultAddress()

```
var nodeEth = require('node-eth-address');

/** 
This password encrypts your private key. This does not act as a seed 
to generate your keys. You will need this password + your private key
to unlock your wallet
*/
var password = 'test@123'; 
var address = nodeEth.getDefaultAddress(password);
/*
{ 
	/* Your ethereum address */
	address: '0xc4d5895cdEd9477018Bcc53F524F8B17e2C3C884',

	/* Your private key */
	privateKey: '0x6371262b577bfb2b36b82e493dd89b00bae550539a890feefdb6c2012d0e89fc',

	/* Your JSON Keystore - make a Json file and store on your local computer */
	keyStore: { 
		address:"0xc4d5895cdEd9477018Bcc53F524F8B17e2C3C884",
		crypto: {
			cipher:"aes-128-ctr",
			ciphertext:"08b0de1bff09f3d4077c135ece5f3140055a66e626ff9f072f670b4840a4645a",
			cipherparams: {
				iv:"51294c8fd947c401f470c16ac9d55f0b"
			},
			mac:"34abb6c37420facd36eb4474e9c849580dc5d51e5d5c7cf453ba32980f9b7389",
			kdf:"pbkdf2",
			kdfparams: {
				c:262144,
				dklen:32,
				prf:"hmac-sha256",
				salt:"a9a18a01e2e468f85f6d003a4c20a9f3da897b2130df3a7fe7df8b40644f4d6b"
			}
		},
		id:"5e4df928-5693-4b9e-a849-2bc812b9ce16",
		version:3
 	} 
}
*/

```

### getEthereumAddress()

```
/* To generate ethereum address from private key  */

var privateKey = '0x6371262b577bfb2b36b82e493dd89b00bae550539a890feefdb6c2012d0e89fc'; 
var ethAddress = nodeEth.getEthereumAddress(privateKey);
/*
	0xc4d5895cdEd9477018Bcc53F524F8B17e2C3C884
*/

```

### validateAddress()

```
/* To Validate ethereum address */

var address = '0xc4d5895cdEd9477018Bcc53F524F8B17e2C3C884'; 
var isValid = nodeEth.validateAddress(address);
/*
	true or false
*/

```


### recoverPrivateKey()

```
/* 
To recover private key from Keystore Json file 
and password which was used to generate address 
*/

var password = 'test@123';
var keyStore: { 
	address:"0xc4d5895cdEd9477018Bcc53F524F8B17e2C3C884",
	crypto: {
		cipher:"aes-128-ctr",
		ciphertext:"08b0de1bff09f3d4077c135ece5f3140055a66e626ff9f072f670b4840a4645a",
		cipherparams: {
			iv:"51294c8fd947c401f470c16ac9d55f0b"
		},
		mac:"34abb6c37420facd36eb4474e9c849580dc5d51e5d5c7cf453ba32980f9b7389",
		kdf:"pbkdf2",
		kdfparams: {
			c:262144,
			dklen:32,
			prf:"hmac-sha256",
			salt:"a9a18a01e2e468f85f6d003a4c20a9f3da897b2130df3a7fe7df8b40644f4d6b"
		}
	},
	id:"5e4df928-5693-4b9e-a849-2bc812b9ce16",
	version:3
	} 

var privateKey = nodeEth.recoverPrivateKey(password,keyStore);
/*
	0x6371262b577bfb2b36b82e493dd89b00bae550539a890feefdb6c2012d0e89fc
*/

```

## Author

* **[Vinay Singh](https://github.com/rkgitvinay)**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
