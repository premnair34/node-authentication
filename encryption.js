'use strict';

const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16
const HASH_PASSWORD = process.env.HASH_PASSWORD;
const salt = process.env.SALT;



function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');  
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();   
}


function encryptPassword(text) {
    return crypto.pbkdf2Sync(text, salt,1000, 64, `sha512`).toString(`hex`); 
}
function validatePassword(password) {
    const hash = crypto.pbkdf2Sync(password,salt, 1000, 64, `sha512`).toString(`hex`); 
    return HASH_PASSWORD === hash; 
}

module.exports = { decrypt, encrypt,validatePassword };