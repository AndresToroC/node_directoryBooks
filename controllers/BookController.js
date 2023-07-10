import { request, response } from "express";
import BookModel from "../models/Book";
import { Paginate } from "../helpers/Paginate";

const MSG_ERROR_ADMIN = process.env.MSG_ERROR_ADMIN;

export const bookGet = async(req = request, res = response) => {
    const { page = 1, limit = 10 } = req.query;

    const currentPage = Number(page);
    const fromLimit = currentPage ? (currentPage - 1) * limit : 0;

    let query = {
        status: true
    };

    try {
        const [totalBooks, books] = await Promise.all([
            BookModel.count(query),
            BookModel.find(query)
                .populate('category')
                .skip(Number(fromLimit))
                .limit(Number(limit))
        ]);

        const paginate = Paginate(currentPage, totalBooks, limit)

        return res.json({
            books,
            ...paginate
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}

export const bookGetId = async(req = request, res = response) => {
    const { bookId } = req.params;

    try {
        const book = await BookModel.findById(bookId);

        return res.json({
            book
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}

export const bookCreate = async(req = request, res = response) => {
    const data = req.body;

    try {
        const book = BookModel(data);
        await book.save();

        return res.json({
            book,
            message: 'Book created successfully'
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}

export const bookUpdate = async(req = request, res = response) => {
    const { bookId } = req.params;
    const data = req.body;

    try {
        const category = await BookModel.findByIdAndUpdate(bookId, data, {
            new: true
        });

        return res.json({
            category,
            message: 'Book updated successfully'
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}

export const bookDelete = async(req = request, res = response) => {
    const { bookId } = req.params;

    try {
        await BookModel.findByIdAndDelete(bookId);

        return res.json({
            message: 'Book deleted successfully'
        })
    } catch (error) {
        return res.status(400).json({
            message: MSG_ERROR_ADMIN
        })
    }
}