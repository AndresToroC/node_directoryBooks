import mongoose from 'mongoose';

const conexDB = async() => {
    try {
        await mongoose.connect(process.env.DB_MONGOOSE)
    } catch (error) {
        throw new Error('Database connection error');
    }
}

export default conexDB