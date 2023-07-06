import { request, response } from 'express';
import bcrypt from 'bcrypt'

import UserModel from '../models/User';

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

        // TODO: Generar Token

        return res.json({
            user
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}

export const register = async(req = request, res = response) => {
    const { name, email, status, role, password } = req.body;

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

        const user = new UserModel({
            name,
            email,
            password: hash,
            status,
            role
        })

        user.save();

        // TODO: Generate token

        return res.json({
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}