import RoleModel from '../models/Role';
import UserModel from '../models/User';

const MSG_ERROR_ADMIN = process.env.MSG_ERROR_ADMIN;

export const validationPasswordConfirmation = (value, { req }) => {
    const { password } = req.body;

    if (password !== value) {
        throw new Error('Password does not match')
    }

    return true;
}

export const validateEmailExist = async(email = '', { req }) => {
    const { userId = null } = req.params;
    let validateEmail = true;

    // Validar si el email es el mismo que tiene el usuario
    if (userId) {
        const user = await UserModel.findById(userId);

        validateEmail = (user.email == email) ? false : true;
    }
    
    if (validateEmail) {
        const userEmail = await UserModel.findOne({ email })
    
        if (userEmail) {
            throw new Error('The email already exist')
        }
    }

    return true;
}

export const validateRoleExist = async(roleId = '') => {
    const role = await RoleModel.findById(roleId);

    if (!role) {
        throw new Error('Rol invalid')
    }

    return true;
}