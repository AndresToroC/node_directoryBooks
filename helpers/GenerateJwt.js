import jwt from 'jsonwebtoken'

export const generateJwt = (uid) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ uid}, process.env.JWT_SERCRET_KEY, {
            expiresIn: '1h'
        }, (error, token) => {
            if (error) {
                reject(error)
            } else {
                resolve(token)
            }
        })
    })
}