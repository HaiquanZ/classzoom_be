import db from "../models";
const bcrypt = require("bcrypt");

export const handleError = (err) => {
    let error;

    // duplicate email error
    if (err.name === 'SequelizeUniqueConstraintError') {
        error = 'Email already exists';
    }

    // validation errors
    else if (err.name === 'SequelizeValidationError') {
        error = err.errors[0].message
    }

    else {
        error = 'Something went wrong';
    }

    return error;
};

export const login = (email, password) => new Promise(async(resolve, reject) => {
    try{
        const user = await db.User.findOne({
            where: {
                email: email
            }
        });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                resolve(user);
            }
            reject(new Error('That password is incorrect'));
        }
        reject(new Error('That email is not registered'));
    }catch(error){
        const message = handleError(error);
        reject(new Error(message));
    }
});

export const register = (user) => new Promise(async(resolve, reject) => {
    try{
        const registeredUser = await db.User.create(user);
        resolve(registeredUser);
    }catch(err){
        const message = handleError(err);
        console.log(message);
        reject(new Error(message));
    }
})