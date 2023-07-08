import { Schema, model } from 'mongoose';

const CategorySchema = Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'The name is required']
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
})

CategorySchema.methods.toJSON = function() {
    const { __v, ...category } = this.toObject();

    return category;
}

const CategoryModel = model('category', CategorySchema);

export default CategoryModel;