import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);

	const onSubmit = async (value) => {
		const data = await dispatch(fetchAuth(value));

		// if (!data.payload) {
		// 	return alert("failed to log in");
		// }

		if ("token" in data.payload) {
			window.localStorage.setItem("token", data.payload.token);
		} else {
			alert("failed to log in");
		}
	};

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Log in to your account
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					{...register("email", { required: "specify the email address" })}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label="password"
					helperText={errors.password?.message}
					error={Boolean(errors.password?.message)}
					{...register("password", { required: "enter the password" })}
					fullWidth
				/>
				<Button
					disabled={!isValid}
					type="submit"
					size="large"
					variant="contained"
					fullWidth
				>
					Sing in
				</Button>
			</form>
		</Paper>
	);
};
