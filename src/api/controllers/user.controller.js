const jwt = require('jsonwebtoken');
import * as userService from '../services/user.service';

require('dotenv').config();

export const register = async (req, res) => {
    let { email, password, username, gender } = req.body;
    if (!email || !password || !username || !gender) {
        return res.status(400).json({
            error: 'Email, password, username and gender are required'
        });
    }
    try {
        const user = await userService.register({ email, password, username, gender });
        res.status(201).json({ data: {msg: 'Register successful!'}});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: 'Email and password are required'
        });
    }

    try {
        const user = await userService.login(email, password);

        const token = jwt.sign({
            user: user,
        }, process.env.JWT_SECRET);

        res.status(200).json({
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                gender: user.gender,
                token: token
            }
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};