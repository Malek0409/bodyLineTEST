import  jwt  from "jsonwebtoken"






export const verifyUser =async(req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ Error: "You are not authenticated" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.status(403).json({ Error: "Token is not valid" });
            } else {
                req.firstName = decoded.firstName;
                req.userId = decoded.userId;
                next();
            }
        });
    }
};