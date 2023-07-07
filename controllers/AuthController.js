import { request, response } from 'express';
import bcrypt from 'bcrypt'

import UserModel from '../models/User';
import { generateJwt } from '../helpers/GenerateJwt';
import RoleModel from '../models/Role';

const MSG_ERROR_ADMIN = process.env.MSG_ERROR_ADMIN;

export const login = async(req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'The email not exist'
            })
        }

        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({
                message: 'Credentials is not valid'
            })
        }

        // Generate Token
        const token = await generateJwt(user.id);

        return res.json({
            user,
            token
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}

export const register = async(req = request, res = response) => {
    const { name, email, status, password } = req.body;

    try {
        const userEmail = await UserModel.findOne({ email });
        if (userEmail) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        
        const { _id: role } = await RoleModel.findOne({ name: 'user' });

        const user = UserModel({
            name,
            email,
            password: hash,
            status,
            role
        })

        user.save();

        // Generate Token
        const token = await generateJwt(user.id);

        return res.json({
            user,
            token
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}