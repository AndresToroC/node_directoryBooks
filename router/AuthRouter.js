import { Router } from 'express';
import { check } from 'express-validator';

import { login, register } from '../controllers/AuthController';
import validateFields from '../middleware/ValidateFields';
import { validationPasswordConfirmation } from '../helpers/Validators';

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
    check('password_confirmation').custom(validationPasswordConfirmation),
    validateFields
], register)

export default router;