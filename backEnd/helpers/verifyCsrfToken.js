import csrf from "csrf";




const tokens = new csrf();



export const verifyCsrfToken = (req, res, next) => {
    const csrfTokenFromRequest = req.headers['x-csrf-token'];
    const csrfTokenFromCookie = req.cookies['csrfToken'];

    if (!csrfTokenFromRequest || !tokens.verify('your-secret-key', csrfTokenFromRequest) || csrfTokenFromRequest !== csrfTokenFromCookie) {
        return res.status(403).json({ Error: "Invalid CSRF token" });
    }
    next();
};