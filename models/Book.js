const { Schema, model } = require('mongoose');

const BookSchema = Schema({
    title: {
        type: String,
        required: [true, 'The title is required']
    },
    author: {
        type: String,
        required: [true, 'The author is required']
    },
    year_published:{
        type: Date,
        required: [true, 'The year published is required']
    },
    editorial: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: [true, 'The category id is required']
    },
    imageUrl: {
        type: String,
        required: [true, 'The imageUrl is required']
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    description: String,
})

const BookModel = model('book', BookSchema);

export default BookModel;