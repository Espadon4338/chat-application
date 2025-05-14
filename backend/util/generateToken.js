import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '14d'
    })

    res.cookie("jwt", token, {
        maxAge: 14 * 24 * 60 * 60 * 1000, // (в милисекундах) 15 дней * 24 часа * 60 минут * 60 секунд * 1000 милисекунд
        httpOnly: true, // отразить XSS атаки
        sameSite: "strict",
    });

    return token;
};

export default generateTokenAndSetCookie;