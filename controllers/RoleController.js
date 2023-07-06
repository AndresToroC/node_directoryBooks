import RoleModel from '../models/Role'

const MSG_ERROR_ADMIN = process.env.MSG_ERROR_ADMIN

export const createRoles = async() => {
    try {
        const roles = ['admin', 'user']

        roles.forEach(async(name) => {
            const rol = await RoleModel.findOne({ name });

            if (!rol) {
                await RoleModel({ name }).save()
            }
        })
    } catch (error) {
        throw new Error(MSG_ERROR_ADMIN)
    }
}