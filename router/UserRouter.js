import { Router } from 'express'
import { check } from 'express-validator';

import validateJwt from '../middleware/ValidateJwt';
import validateFields from '../middleware/ValidateFields';

import { userCreate, userDelete, userGet, userGetId, userUpdate } from '../controllers/UserController';
import { validateEmailExist, validateRoleExist, validationPasswordConfirmation } from '../helpers/Validators';

const router = Router();

router.use(validateJwt);

// List all users
router.get('/', userGet)

// Show user for id
router.get('/:userId', [
    check('userId', 'Id is not valid').isMongoId(),
    validateFields
], userGetId)

// Create user
router.post('/', [
    check('name', 'The name field is required').trim().notEmpty(),
    check('email', 'The email field is required').trim().notEmpty(),
    check('password', 'The password field is required').trim().notEmpty(),
    check('password', 'The password must have a minimum of 6 characters').isLength({ min: 6 }),
    check('password_confirmation').custom(validationPasswordConfirmation),
    check('role', 'Role id is not valid').isMongoId(),
    check('email').custom(validateEmailExist),
    check('role').custom(validateRoleExist),
    validateFields
], userCreate)

// Update user
router.put('/:userId', [
    check('name', 'The name field is required').trim().notEmpty(),
    check('email', 'The email field is required').trim().notEmpty(),
    check('password_confirmation').custom(validationPasswordConfirmation),
    check('role', 'Role id is not valid').isMongoId(),
    check('email').custom(validateEmailExist),
    check('role').custom(validateRoleExist),
    validateFields
], userUpdate)

// Delete user
router.delete('/:userId', [
    check('userId', 'Id is not valid').isMongoId(),
    validateFields
], userDelete)

export default router