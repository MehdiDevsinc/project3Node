const { sign, verify } = require ("jsonwebtoken");

const createTokens = (user) => {
    const accessToken = sign(
        { usename: user.usename, id: user.id},
            "secret"
        
        );
    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if(!accessToken)
    return res.status(400).json({error: " unauthorized user"})

    try {
        const validToken = verify (accessToken, "secret")
        if (validToken){
            req.authenticated = true
            return next ()
        }
    } catch (error) {
        return res.status(400).json({error: error})
    }
};

module.exports = { createTokens };
