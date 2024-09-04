const { sign, verify } = require("jsonwebtoken");
require("dotenv").config()
const secret = process.env.JWT_SECRET;

module.exports = {
    signToken: (payload) => sign(payload, secret),
    verifyToken: (token) => verify(token, secret),
};
