const bcrypt = require("bcrypt");

export class CEncrypt {
  constructor() {}
  encription(value) {
    return new Promise(async function (resolve, rejects) {
      const hashedPasswrod = bcrypt
        .hash(value, 10)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  async validatePassword(value0, value1) {
    try {
      if (await bcrypt.compare(value0, value1)) {
        return "Success";
      } else {
        return "Not Allowed";
      }
    } catch (err) {
      console.log(err);
    }
  }
}
