const jwt = require("jsonwebtoken");
const config = require('../config')

module.exports = {
    generateToken: (email, password) => {
        return jwt.sign({ email: email, password: password }, config.PRIVATE_KEY , {
            expiresIn: '24h'
        })
    },
    getToken: (token) => {
        const bearerHeader = token;

        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            return bearer[1];
        }else{
            return ' '
        }    
    },
    verifyToken: (token) => {
        try {
            return jwt.verify(token, config.PRIVATE_KEY)
        } catch(err){
            return err.message
        }
    },
}