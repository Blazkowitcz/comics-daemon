const jwt = require("jsonwebtoken");

/**
 * Check if user token exist and is valid
 * @param {Request} req 
 * @param {Result} res 
 * @param {Next} next 
 * @returns 
 */
exports.checkToken = function (req, res, next) {
    const token = req.header("token");
    if (!token) return res.status(401).json({ message: "Auth Error" });
    try {
        const decoded = jwt.verify(token, "randomString");
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(401).send({ message: "Invalid Token" });
    }
};