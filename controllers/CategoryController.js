import { request, response } from "express";
import CategoryModel from "../models/Category";
import { Paginate } from "../helpers/Paginate";

const MSG_ERROR_ADMIN = process.env.MSG_ERROR_ADMIN;

export const categoryGet = async(req = request, res = response) => {
    const { page = 1, limit = 10 } = req.query;

    const currentPage = Number(page);
    const fromLimit = currentPage ? (currentPage - 1) * limit : 0;

    let query = {
        status: true
    }

    try {
        const [totalCategories, categories] = await Promise.all([
            CategoryModel.count(query),
            CategoryModel.find(query)
                .skip(Number(fromLimit))
                .limit(Number(limit))
        ])
        
        const paginate = Paginate(currentPage, totalCategories, limit);

        return res.json({
            categories,
            ...paginate
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}

export const categoryGetId = async(req = request, res = response) => {
    const { categoryId } = req.params;

    try {
        const category = await CategoryModel.findById(categoryId);

        return res.json({
            category
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}

export const categoryCreate = async(req = request, res = response) => {
    const { name, status } = req.body;

    try {
        const categoryExist = await CategoryModel.findOne({ name });
        if (categoryExist) {
            return res.json({
                message: 'The category already exist'
            })
        }

        const category = CategoryModel({
            name,
            status
        });

        await category.save();

        return res.json({
            category,
            message: 'Category created successfully'
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}

export const categoryUpdate = async(req = request, res = response) => {
    const { categoryId } = req.params;
    const data = req.body;

    try {
        const categoryFindId = await CategoryModel.findById(categoryId);

        if (data.name !== categoryFindId.name) {
            const categoryExist = await CategoryModel.findOne({ name: data.name });

            if (categoryExist) {
                return res.json({
                    message: 'The category already exist'
                })
            }
        }

        const category = await CategoryModel.findByIdAndUpdate(categoryFindId, data, {
            new: true
        })

        return res.json({
            category,
            message: 'Category updated successfully'
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}

export const categoryDelete = async(req = request, res = response) => {
    const { categoryId } = req.params;

    try {
        const query = {
            status: false
        }

        await CategoryModel.findByIdAndUpdate(categoryId, query)

        return res.json({
            message: 'Category deleted successfully'
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}