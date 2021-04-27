import crypto from "crypto"

namespace PasswordUtils {
  export function genPassword(password: string) {
    const salt = crypto.randomBytes(32).toString("hex")
    const genHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex")

    return {
      salt: salt,
      hash: genHash,
    }
  }

  export function validPassword(password: string, hash: string, salt: string) {
    var hashVerify = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex")
    return hash === hashVerify
  }
}

export default PasswordUtils
