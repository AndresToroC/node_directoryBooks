import { request, response } from 'express';
import bcrypt from 'bcrypt'

import UserModel from '../models/User';
import { Paginate } from '../helpers/Paginate';

const MSG_ERROR_ADMIN = process.env.MSG_ERROR_ADMIN

export const userGet = async(req = request, res = response) => {
    const { page = 1, limit = 10 } = req.query;

    const currentPage = Number(page);
    const fromLimit = currentPage ? (currentPage - 1) * limit : 0;

    let query = {
        status: true
    }
    
    try {
        const [totalUsers, users] = await Promise.all([
            UserModel.count(query),
            UserModel.find(query)
                .skip(Number(fromLimit))
                .limit(Number(limit))
        ])

        const paginate = Paginate(currentPage, totalUsers, limit)

        res.json({
            users,
            ...paginate
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}

export const userGetId = async(req = request, res = response) => {
    const { userId } = req.params;
    try {
        const user = await UserModel.findById(userId)
        
        res.json({
            user
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}

export const userCreate = (req = request, res = response) => {
    const { password, ...dataUser  } = req.body;

    try {
        const user = UserModel(dataUser);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        user.password = hash;

        user.save();

        return res.json({
            user
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}

export const userUpdate = async(req = request, res = response) => {
    const { userId } = req.params;
    const { password, password_confirmation, ...userData  } = req.body;

    try {
        if (password) {
            // Encrypt password
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);

            userData.password = hash;
        }

        const user = await UserModel.findByIdAndUpdate(userId, userData, {
            new: true
        });

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

export const userDelete = async(req = request, res = response) => {
    const { userId } = req.params;

    try {
        // await UserModel.findByIdAndDelete(userId);

        // Update user status
        const query = {
            status: false
        }

        await UserModel.findByIdAndUpdate(userId, query)

        return res.json({
            message: 'User deleted successfully'
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}