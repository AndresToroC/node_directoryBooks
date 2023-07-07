import UserModel from '../models/User';

const MSG_ERROR_ADMIN = process.env.MSG_ERROR_ADMIN;

export const validateIsAdmin = async(req, res, next) => {
    const uid = req.uid;

    try {
        const user = await UserModel.findById(uid).populate('role');

        if (user && user.status && user.role.name !== 'admin') {
            return res.status(401).json({
                message: `You don't have permission to access this resource`
            })
        } else {
            next();
        }
    } catch (error) {
        return res.status(401).json({
            message: MSG_ERROR_ADMIN
        })
    }
}