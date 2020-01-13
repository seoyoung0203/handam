"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
const fs = require("fs");
const pbkdf2 = require("pbkdf2");
const file = './packages/utils/config/env.json';
let encryptionData = fs.readFileSync(file, 'utf8');
encryptionData = JSON.parse(encryptionData);
/** salt 값 */
let salt = encryptionData.encryption.salt;
/** 암호화 횟수 */
let iterations = 5;
/** 암호화 길이 */
let keyLength = 16;
/** 암호화 방식 */
let digest = encryptionData.encryption.digest;
class EncryptionPw {
    getHash(pwd) {
        let derivedKey = pbkdf2.pbkdf2Sync(pwd, salt, iterations, keyLength, digest);
        return derivedKey.toString('hex');
    }
}
class EncryptHansungInfoPw {
    encryptHansungInfoPw(hansungInfoPw) {
        let ciphertext = CryptoJS.AES.encrypt(hansungInfoPw, salt);
        return ciphertext;
    }
}
class DecryptHansungInfoPw {
    decryptHansungInfoPw(hansungInfoPw) {
        let bytes = CryptoJS.AES.decrypt(hansungInfoPw.toString(), salt);
        let plaintext = bytes.toString(CryptoJS.enc.Utf8);
        return plaintext;
    }
}
exports.encriptionPw = new EncryptionPw();
exports.encryptHansungInfoPw = new EncryptHansungInfoPw();
exports.decryptHansungInfoPw = new DecryptHansungInfoPw();
//# sourceMappingURL=encryption.util.js.map