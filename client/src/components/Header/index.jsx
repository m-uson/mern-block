import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();

	const onClickLogout = () => {
		if (window.confirm("Are you sure you want to log")) {
			dispatch(logout());
			window.localStorage.removeItem("token");
		}
	};

	return (
		<div className="bg-white py-[10px] mb-[30px] border border-c-e0 border-solid">
			<Container maxWidth="lg">
				<div className="flex justify-between">
					<Link
						className="bg-black text-white font-bold uppercase px-[10px] rounded-[5px] flex items-center justify-center hover:bg-blue-600"
						to="/"
					>
						<div>MY BLOG</div>
					</Link>
					<div>
						{isAuth ? (
							<>
								<Link to="/add-post" className="mr-[10px]">
									<Button variant="contained">Write an article</Button>
								</Link>
								<Button
									onClick={onClickLogout}
									variant="contained"
									color="error"
								>
									Log out
								</Button>
							</>
						) : (
							<>
								<Link to="/login" className="mr-[10px]">
									<Button variant="outlined">Sign In</Button>
								</Link>
								<Link to="/register">
									<Button variant="contained">Create account</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
