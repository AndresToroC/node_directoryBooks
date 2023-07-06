import mongoose, { Schema } from 'mongoose';

const RoleSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Role Name is Required']
    }
})

const RoleModel = mongoose.model('Role', RoleSchema);

export default RoleModel