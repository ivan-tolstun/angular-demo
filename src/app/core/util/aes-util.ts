import * as CryptoJS from 'crypto-js';

// const CryptoJS = require("crypto-js")

export class AesUtil {

  private constructor() {
  }

  public static encrypt(plaintext: string,
                        secret: string): string {
    return CryptoJS.AES
      .encrypt(plaintext, CryptoJS.SHA256(secret), {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
      .toString()
  }

  public static decrypt(ciphertext: string,
                        secret: string): string {
    return CryptoJS.AES
      .decrypt(ciphertext, CryptoJS.SHA256(secret), {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
      .toString(CryptoJS.enc.Utf8)
  }

}
