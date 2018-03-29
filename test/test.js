var ethAddress = require('../index.js');

var def = ethAddress.getDefaultAddress('vinay');

var address = ethAddress.getEthereumAddress('0xf82df9cbdd851fbc8f0228b99ccba151d89d40831454499006999b82e4f3ebf4');

var verify = ethAddress.validateAddress('0x2410d95Bd4652EFB80c6b5FdB3463ac4Ce6410f2');

var keyStore =  {
	"address":"83fe3fe7aea20eeabdcdec5559296fb418b4c9b1",
	"crypto": {
		"cipher":"aes-128-ctr",
		"ciphertext":"08b0de1bff09f3d4077c135ece5f3140055a66e626ff9f072f670b4840a4645a",
		"cipherparams": {
			"iv":"51294c8fd947c401f470c16ac9d55f0b"
		},
		"mac":"34abb6c37420facd36eb4474e9c849580dc5d51e5d5c7cf453ba32980f9b7389",
		"kdf":"pbkdf2",
		"kdfparams": {
			"c":262144,
			"dklen":32,
			"prf":"hmac-sha256",
			"salt":"a9a18a01e2e468f85f6d003a4c20a9f3da897b2130df3a7fe7df8b40644f4d6b"
		}
	},
	"id":"5e4df928-5693-4b9e-a849-2bc812b9ce16",
	"version":3
}

var ppk = ethAddress.recoverPrivateKey('vinay',keyStore);

// console.log(ppk);
// console.log(def);
// console.log(address);
// console.log(verify);