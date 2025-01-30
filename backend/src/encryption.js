const crypto = require('crypto');

// Use a secure key and IV length for AES-256-CBC
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 characters for AES-256
const IV_LENGTH = 16; // AES block size

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
    throw new Error("Invalid ENCRYPTION_KEY. It must be 32 characters long.");
}

const encrypt = (text) => {
    const iv = crypto.randomBytes(IV_LENGTH); // Generate a random IV
    const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        Buffer.from(ENCRYPTION_KEY, 'utf-8'),
        iv
    );

    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};

const decrypt = (encryptedText) => {
    const [iv, encrypted] = encryptedText.split(':');
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(ENCRYPTION_KEY, 'utf-8'),
        Buffer.from(iv, 'hex')
    );

    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
};

module.exports = { encrypt, decrypt };
