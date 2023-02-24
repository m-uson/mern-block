import React, { useCallback, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../../axios";

export const AddPost = () => {
	const navigate = useNavigate();
	const isAuth = useSelector(selectIsAuth);
	const [text, setText] = useState("");
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const inputFileRef = useRef(null);
	const [imageUrl, setImageUrl] = useState("");

	console.log(tags);

	const handleChangeFile = async (event) => {
		try {
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append("image", file);

			const { data } = await axios.post("/upload", formData);

			setImageUrl(data.url);
		} catch (error) {
			console.warn(error);
			alert("error when starting the file...");
		}
	};

	const onClickRemoveImage = () => {
		setImageUrl("");
	};

	const onChange = useCallback((value) => {
		setText(value);
	}, []);

	const onSubmit = async () => {
		try {
			setIsLoading(true);

			const fields = {
				title,
				imageUrl,
				tags: tags.split(","),
				text,
			};

			const { data } = await axios.post("./posts", fields);

			const id = data._id;

			navigate(`/posts/${id}`);
		} catch (error) {
			console.warn(error);
			console.log(error);
			alert("error when creating a post");
		}
	};

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: "400px",
			autofocus: true,
			placeholder: "Enter the text...",
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	);

	if (localStorage.getItem("token") && !isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<Paper style={{ padding: 30 }}>
			<Button
				onClick={() => inputFileRef.current.click()}
				variant="outlined"
				size="large"
			>
				Download preview
			</Button>
			<input
				ref={inputFileRef}
				type="file"
				onChange={handleChangeFile}
				hidden
			/>
			{imageUrl && (
				<>
					<Button
						variant="contained"
						color="error"
						onClick={onClickRemoveImage}
					>
						Remove
					</Button>
					<img
						className={styles.image}
						src={`http://localhost:4444${imageUrl}`}
						alt="Uploaded"
					/>
				</>
			)}
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant="standard"
				placeholder="The title of the article..."
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				fullWidth
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant="standard"
				placeholder="Tags"
				value={tags}
				onChange={(e) => setTags(e.target.value)}
				fullWidth
			/>
			<SimpleMDE
				className={styles.editor}
				value={text}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button onClick={onSubmit} size="large" variant="contained">
					To publish
				</Button>
				<a href="/">
					<Button size="large">Cancel</Button>
				</a>
			</div>
		</Paper>
	);
};
