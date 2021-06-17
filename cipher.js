const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const password = '2001MyForever';
// We will first generate the key, as it is dependent on the algorithm.
// In this case for aes192, the key is 24 bytes (192 bits).
module.exports = {
    encrypt: async (password) => {
        if(!password) return ''
        const cipher = crypto.createCipheriv(algorithm, password);
        let crypted = cipher.update(text, 'utf-8', 'base64');
        crypted += cipher.final('base64');
        return crypted;
    },
    decrypt : (password) => {
        if(!password) return ''
        const decipher = crypto.createDecipher(algorithm, password);
        let decrypted = decipher.update(password, 'base64', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
}

