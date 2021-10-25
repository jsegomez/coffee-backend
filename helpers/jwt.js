const jwt = require('jsonwebtoken');

const generateJWT = async(uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se logro generar JWT');
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = generateJWT;