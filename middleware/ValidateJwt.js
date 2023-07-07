import jwt from 'jsonwebtoken'
import UserModel from '../models/User';

const validateJwt = async(req, res, next) => {
    try {
        let token = req.headers.authorization;
        req.uid = null;
    
        token = token.split(' ')[1];
        
        const { uid } = jwt.verify(token, process.env.JWT_SERCRET_KEY)
        
        const user = await UserModel.findById(uid);
        
        if (!user || !user.status) {
            return res.status(401).json({
                message: 'Token is not valid'
            })
        }

        req.uid = uid;
        
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token is not valid'
        })
    }
}

export default validateJwt;