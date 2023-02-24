import { body } from "express-validator";

export const loginValidation = [
	body("email", "Неверный фомат почты").isEmail(),
	body("password", "Пароль должен быть 5 символов").isLength({ min: 5 }),
];

export const registerValidation = [
	body("email", "Неверный фомат почты").isEmail(),
	body("password", "Пароль должен быть 5 символов").isLength({ min: 5 }),
	body("fullName", "Укажите имя").isLength({ min: 3 }),
	body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];

export const postCreateValidation = [
	body("title", "Введите заголовок").isLength({ min: 3 }).isString(),
	body("text", "Введите текст").isLength({ min: 3 }).isString(),
	body("tags", "Неверный формат тэгов").optional().isString(),
	body("imgUrl", "Неверная ссылка на изображение").optional().isString(),
];
