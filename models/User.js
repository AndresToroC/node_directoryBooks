import { Schema, model } from 'mongoose';

const UserSchema = Schema({
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
}, {
    timestamps: true
})

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...user } = this.toObject();

    user.uid = _id;

    return user;
}

const UserModel = model('user', UserSchema);

export default UserModel