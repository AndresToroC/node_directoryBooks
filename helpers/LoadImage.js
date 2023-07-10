import { v4 as uuidv4 } from 'uuid';
import path from 'path'
import fs from 'fs';

export const uploadImage = (file, validationExtensions = ['jpg', 'jpeg', 'png'], folder = '') => {
    return new Promise((resolve, reject) => {
        const dataFile = file.name.split('.');
        const extensionFile = dataFile[dataFile.length - 1];

        // Validate extension is valid
        if (!validationExtensions.includes(extensionFile)) {
            return reject(`The ${ extensionFile } extension is invalid. Use ${ validationExtensions }`);
        }

        const nameFile = `${ uuidv4() }.${ extensionFile }`;
        const pathName = path.join(__dirname, '../files', folder, nameFile);

        file.mv(pathName, (err) => {
            if (err) return reject(err);

            resolve(nameFile);
        })
    });
}

export const deleteImage = (nameFile, folder = '') => {
    const pathName = path.join(__dirname, '../files', folder, nameFile);

    if (fs.existsSync(pathName)) {
        fs.unlinkSync(pathName);
    }

    return true;
}