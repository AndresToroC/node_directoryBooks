import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    }
})

const UserModel = mongoose.model('User', UserSchema);

export default UserModel