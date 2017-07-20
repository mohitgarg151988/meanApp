/**
 * Created by mohitgupta on 13/7/17.
 */
'use strict';
var crypto = require('crypto');

//block start to manage password
/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
exports.genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
exports.sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

/**
 * get password with salt and hash value
 * @function
 * @param string userpassword
 */
exports.getSaltHashPassword = function(userpassword,salt,fn) {
    if (!salt)
     salt = exports.genRandomString(16); /** Gives us salt of length 16 */
     var passowrdHash = exports.sha512(userpassword, salt);
     fn(passowrdHash);
}
//block end to manage password