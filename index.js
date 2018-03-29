'use strict';

var keythereum = require("keythereum");
var ethers = require('ethers');
var SHA3 = require('crypto-js/sha3');

var sha3 = (value) => {
  return SHA3(value, {
    outputLength: 256
  }).toString();
}

/**
	To generate the random private key 
	and its Ethereum compliance address 
	along with Keystore (UTJ/JSON) file data
	
	* @method generateAddress
	* @param {password} String
 	* @return {Object}
*/

var getDefaultAddress = (password) => { 
	var params = { keyBytes: 32, ivBytes: 16 };

	var rawData = keythereum.create(params);
	
	/* default parameters */
	var kdf = "pbkdf2";
	var options = {
	  kdf: "pbkdf2",
	  cipher: "aes-128-ctr",
	  kdfparams: {
	    c: 262144,
	    dklen: 32,
	    prf: "hmac-sha256"
	  }
	};

	/* Keystore JSON */
	var keyObject = keythereum.dump(password, rawData.privateKey, rawData.salt, rawData.iv, options);

	/* Private Key */
	var privateKey = "0x"+keythereum.recover(password, keyObject).toString('hex');

	var wallet = new ethers.Wallet(privateKey);

	/* Ethereum Wallet Address */
	var address = wallet.address;

	return {
		address:wallet.address,
		privateKey:privateKey,
		keyStore:keyObject
	}
}



/**
	To get the Ethereum address from 
	private key (Hex)

	* @method getEthAddress
	* @param {privateKey} Hexadecimal String
 	* @return {String} 
*/

var getEthereumAddress = (privateKey) => {
	if(privateKey === undefined || privateKey === ''){
		throw 'Private Key Required';
	}else{

		try{
			var wallet = new ethers.Wallet(privateKey);	

			// ethereum address associated with given private key
			return wallet.address;
		}catch(err){
			throw err;
		}

	}
}


/* To recover private key 
	from Json File using Signed Password
	
	* @method {recoverPrivateKey}
	* @param {password} String
	* @param {keyStoreObjects} KeyStore File Objects
 	* @return {String} Hexadecimal Private keys
 */
var recoverPrivateKey = (password,keyStoreObjects) => {
	var privateKey = "0x"+keythereum.recover(password, keyStoreObjects).toString('hex');
	return privateKey;
}




/**
 * Checks if the given string is an address
 *
 * @method validateAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var validateAddress = (address) => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};



/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isChecksumAddress = (address) => {
    // Check each case
    address = address.replace('0x','');
    var addressHash = sha3(address.toLowerCase());
    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};

module.exports = exports = {
	getDefaultAddress:getDefaultAddress,
	getEthereumAddress:getEthereumAddress,
	recoverPrivateKey:recoverPrivateKey,
	validateAddress:validateAddress
}