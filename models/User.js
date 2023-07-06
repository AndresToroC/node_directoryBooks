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
        type: Schema.Types.ObjectId,
        ref: 'roles',
        required: true
    }
})

const UserModel = mongoose.model('User', UserSchema);

export default UserModel