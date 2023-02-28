import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import {
	loginValidation,
	postCreateValidation,
	registerValidation,
} from "./validations.js";
import { UserController, PostController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";

mongoose.set("strictQuery", false);

mongoose
	.connect(
		"mongodb+srv://admin:Uyo3N1UbHnA5zNVg@cluster0.paachfe.mongodb.net/blog?retryWrites=true&w=majority"
	)
	.then(() => console.log("DB ok"))
	.catch((err) => console.log("DB error", err));

dotenv.config();

const app = express();

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, "uploads");
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

app.use(cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post(
	"/auth/register",
	registerValidation,
	handleValidationErrors,
	UserController.register
);

app.post(
	"/auth/login",
	loginValidation,
	handleValidationErrors,
	UserController.login
);

app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});
});

app.get("/tags", PostController.getTags);

app.get("/posts", PostController.getAll);

app.get("/posts/tags", PostController.getTags);

app.get("/posts/:id", PostController.getOne);

app.post(
	"/posts",
	checkAuth,
	postCreateValidation,
	handleValidationErrors,
	PostController.create
);

app.patch(
	"/posts/:id",
	checkAuth,
	postCreateValidation,
	handleValidationErrors,
	PostController.update
);

app.delete("/posts/:id/", checkAuth, PostController.remove);

app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log("Server OK http://localhost:4444");
});
