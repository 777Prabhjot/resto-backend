import jwt from "jsonwebtoken";

const secret = 'mysecret';

export const userAuth = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(authHeader){
        
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret, (err, user) => {
            if(err){
                return res.status(401).json({message: "Invalid token"});
            }
            req.user = user
            next();
        });
    }else {
        return res.status(400).json({message: "token is required"});
    }

}