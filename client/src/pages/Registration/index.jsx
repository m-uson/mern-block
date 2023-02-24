import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

export const Registration = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);

	const onSubmit = async (value) => {
		const data = await dispatch(fetchRegister(value));

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
				Creating an account
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="First name"
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					{...register("fullName", { required: "enter the full name" })}
					fullWidth
				/>
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
					label="Password"
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
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
					Sign up
				</Button>
			</form>
		</Paper>
	);
};
