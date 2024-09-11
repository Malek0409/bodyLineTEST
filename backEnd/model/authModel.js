import { bd } from "../bd.js";

export const findUserByEmail = (email, callback) => {
    const query = "SELECT * FROM user WHERE email = ?";
    bd.query(query, [email], callback);
};

export const createUser = (user) => {
    const query = `
        INSERT INTO user (firstName, lastName, email, password, picture, type, actif, confirmationCode) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [user.firstName, user.lastName, user.email, user.password,
        user.picture, user.type, user.actif, user.confirmationCode];
    return bd.promise().execute(query, values);
};



export const verifyUserEmail = (email, code, callback) => {
    const query = "SELECT * FROM user WHERE email = ? AND confirmationCode = ?";
    bd.query(query, [email, code], callback);
};

export const activateUser = (email, callback) => {
    const query = "UPDATE user SET actif = 'ACTIF', confirmationCode = NULL WHERE email = ?";
    bd.query(query, [email], callback);
};

export const findUserById = (userId, callback) => {
    const query = `
        SELECT 
            firstName, lastName, email, picture, type 
        FROM 
            user 
        WHERE 
            id = ?
    `;
    bd.query(query, [userId], callback);
};
