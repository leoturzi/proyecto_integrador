const { body, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

const validations = [
    body('avatar')
        .custom((value, { req }) => {
            const file = req.file;
            const validExt = ['.jpg', '.png', '.jpeg'];
            const fileExt = path.extname(file.originalname);
            if (!file) {
                throw new Error(
                    'Debes subir una imagen en formato jpg, jpeg o png'
                );
            } else if (!validExt.includes(fileExt)){
                fs.unlinkSync(file.path);
                throw new Error(
                    'Debes subir una imagen en formato jpg, jpeg o png'
                    );
            }
            return true;
        })
        .bail(),
    body('first_name')
        .notEmpty()
        .withMessage('Debes ingresar un Nombre')
        .bail(),
    body('last_name')
        .notEmpty()
        .withMessage('Debes ingresar un Apellido')
        .bail(),
    body('email')
        .notEmpty()
        .withMessage('Debes ingresar un email')
        .bail()
        .isEmail()
        .withMessage('Debes ingresar un email Valido')
        .bail(),
    body('provincia')
        .custom((value) => {
            if (value === '') {
                throw new Error('Debes seleccionar una provincia');
            }
            return true;
        })
        .bail(),
    body('calle').notEmpty().withMessage('Debes ingresar una calle').bail(),
    body('phone').notEmpty().withMessage('Debes ingresar un telefono').bail(),
    body('password')
        .notEmpty()
        .withMessage('Debes ingresar un password')
        .bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        })
        .withMessage(
            'El password debe contener minimo 8 caracteres, 1 mayuscula, 1 minuscula y 1 numero'
        ),
];

module.exports = { validations, validationResult };
