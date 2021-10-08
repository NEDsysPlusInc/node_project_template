const jwt = require("jsonwebtoken");
let refreshTokensList = [] as any;

export class CTokenManagement {
  constructor() {} // end of constructor

  authenticateToken(req, res, next) {
    /***************************************************************************
     * Token Verification                                                      *
     **************************************************************************/
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      req.error = { error: 401, message: "Token is required" };
      next();
      return req;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        req.error = { error: 403, message: "Invalid token" };
        next();
        return req;
      }

      req.user = user;
      next();
      return req;
    });
    // }
    /****************************[ End of Token Verification ]************************/
  }

  generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
  }

  refreshAccessToken(user) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokensList.push(refreshToken);
    return refreshToken;
  }

  getRefreshTokenList() {
    return refreshTokensList;
  }
}
