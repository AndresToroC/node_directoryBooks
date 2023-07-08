import { request, response } from 'express';
import { OAuth2Client } from 'google-auth-library'
import bcrypt from 'bcrypt'

import UserModel from '../models/User';
import { generateJwt } from '../helpers/GenerateJwt';
import RoleModel from '../models/Role';

const MSG_ERROR_ADMIN = process.env.MSG_ERROR_ADMIN;

export const login = async(req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        const comparePassword = bcrypt.compareSync(password, user.password);
        
        if (!user || !user.status || !comparePassword) {
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

        await user.save();

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

export const authGoogle = async(req = request, res = response) => {
    const { credential } = req.body;
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

    try {
        const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: GOOGLE_CLIENT_ID,
        });
    
        const { name, email } = ticket.getPayload();
    
        let user = await UserModel.findOne({ email });
        if (!user) {
            const { _id: role } = await RoleModel.findOne({ name: 'user' });

            user = UserModel({
                name,
                email,
                role
            })

            await user.save();
        }

        const token = await generateJwt(user.id);
    
        res.json({
            user,
            token
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}