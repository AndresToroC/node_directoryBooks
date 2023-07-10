import { Router } from 'express';
import { check } from 'express-validator';

import validateJwt from '../middleware/ValidateJwt';
import validateFields from '../middleware/ValidateFields';
import { validateIsAdmin } from '../middleware/ValidateRole';

import { categoryCreate, categoryDelete, categoryGet, categoryGetId, categoryUpdate } from '../controllers/CategoryController';

const router = Router();

router.use(validateJwt)

router.get('/', categoryGet);

router.get('/:categoryId', [
    check('categoryId', 'Id is not valid').isMongoId(),
    validateFields
], categoryGetId)

router.post('/', [
    validateIsAdmin,
    check('name', 'The name field is required').trim().notEmpty(),
    validateFields
], categoryCreate)

router.put('/:categoryId', [
    validateIsAdmin,
    check('categoryId', 'Id is not valid').isMongoId(),
    check('name', 'The name field is required').trim().notEmpty(),
    validateFields
], categoryUpdate)

router.delete('/:categoryId', [
    validateIsAdmin,
    check('categoryId', 'Id is not valid').isMongoId(),
    validateFields
], categoryDelete)

export default router;