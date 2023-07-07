import { Router } from 'express';
import { check } from 'express-validator';

import { login, register } from '../controllers/AuthController';
import { validateEmailExist, validationPasswordConfirmation } from '../helpers/Validators';

import validateFields from '../middleware/ValidateFields';

const router = Router();

router.post('/login', [
    check('email', 'The email field is required').trim().notEmpty(),
    check('password', 'The password field is required').trim().notEmpty(),
    validateFields
], login);

router.post('/register', [
    check('name', 'The name field is required').trim().notEmpty(),
    check('email', 'The email field is required').trim().notEmpty(),
    check('password', 'The password field is required').trim().notEmpty(),
    check('password', 'The password must have a minimum of 6 characters').isLength({ min: 6 }),
    check('password_confirmation').custom(validationPasswordConfirmation),
    check('email').custom(validateEmailExist),
    validateFields
], register)

export default router;