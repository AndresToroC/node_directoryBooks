import { Schema, model } from 'mongoose';

const RoleSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Role Name is Required']
    }
}, {
    timestamps: true
})

const RoleModel = model('role', RoleSchema);

export default RoleModel