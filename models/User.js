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
        type: String
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'role',
        required: true
    }
}, {
    timestamps: true
})

// TODO: Crear campo para saber si se autentico con google

UserSchema.methods.toJSON = function() {
    const { __v, _id, password, role, ...user } = this.toObject();

    user.uid = _id;
    user.role = role;

    return user;
}

const UserModel = model('user', UserSchema);

export default UserModel