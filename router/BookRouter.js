import { Router } from 'express';
import { check } from 'express-validator';

import validateJwt from '../middleware/ValidateJwt';
import validateFields from '../middleware/ValidateFields';
import { validateIsAdmin } from '../middleware/ValidateRole';

import { bookCreate, bookDelete, bookGet, bookGetId, bookUpdate } from '../controllers/BookController';

const router = Router();

router.use(validateJwt);

router.get('/', bookGet);
// El rol de user solo puede ver los libros, no los puede crear

router.get('/:bookId', [
    check('bookId', 'Id is not valid').isMongoId(),
    validateFields
], bookGetId);

router.post('/', [
    validateIsAdmin,
    check('title', 'The title field is required').trim().notEmpty(),
    check('author', 'The author field is required').trim().notEmpty(),
    check('year_published', 'The year_published field is required').trim().notEmpty(),
    check('editorial', 'The editorial field is required').trim().notEmpty(),
    check('category', 'Id category is not valid').isMongoId(),
    validateFields
], bookCreate);

router.put('/:bookId', [
    validateIsAdmin,
    check('bookId', 'Id is not valid').isMongoId(),
    check('title', 'The title field is required').trim().notEmpty(),
    check('author', 'The author field is required').trim().notEmpty(),
    check('year_published', 'The year_published field is required').trim().notEmpty(),
    check('editorial', 'The editorial field is required').trim().notEmpty(),
    check('category', 'Id category is not valid').isMongoId(),
    validateFields
], bookUpdate);

router.delete('/:bookId', [
    validateIsAdmin,
    check('bookId', 'Id is not valid').isMongoId(),
    validateFields
], bookDelete)

export default router;