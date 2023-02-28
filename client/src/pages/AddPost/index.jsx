import React, { useCallback, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";

export const AddPost = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const isAuth = useSelector(selectIsAuth);
	const [text, setText] = useState("");
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const inputFileRef = useRef(null);
	const [imageUrl, setImageUrl] = useState("");

	const isEditing = Boolean(id);

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
				tags,
				text,
			};

			const { data } = isEditing
				? await axios.patch(`./posts/${id}`, fields)
				: await axios.post("./posts", fields);

			const _id = isEditing ? id : data._id;

			navigate(`/posts/${_id}`);
		} catch (error) {
			console.warn(error);
			alert("error when creating a post");
		}
	};

	useEffect(() => {
		if (id) {
			axios
				.get(`/posts/${id}`)
				.then(({ data }) => {
					setTitle(data.title);
					setText(data.text);
					setImageUrl(data.imageUrl);
					setTags(data.tags.join(","));
				})
				.catch((err) => {
					console.warn(err);
					alert("error");
				});
		}
	}, []);

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
					{isEditing ? "Save" : "To publish"}
				</Button>
				<Link to="/">
					<Button size="large">Cancel</Button>
				</Link>
			</div>
		</Paper>
	);
};
