import React, { useEffect, useState } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios.js";

export const FullPost = () => {
	const [data, setData] = useState();
	const [isLoding, setIsLoding] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`/posts/${id}`)
			.then((res) => {
				setData(res.data);
				setIsLoding(false);
			})
			.catch((err) => {
				console.warn(err);
				alert("Ошибка при получении статьи");
			});
	});
	if (isLoding) {
		return <Post isLoding={isLoding} isFullPost />;
	}

	return (
		<>
			<Post
				_id={data._id}
				title={data.title}
				imageUrl="https://b2520242.smushcdn.com/2520242/wp-content/uploads/2022/01/No-code-platform-1920-%C3%97-800-px.jpg?lossy=0&strip=1&webp=1"
				user={data.user}
				createdAt={data.createdAt}
				viewsCount={data.viewsCount}
				commentsCount={3}
				tags={data.tags}
				isEditable
			>
				<p>{data.text}</p>
			</Post>
			<CommentsBlock
				items={[
					{
						user: {
							fullName: "Вася Пупкин",
							avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
						},
						text: "Это тестовый комментарий 555555",
					},
					{
						user: {
							fullName: "Иван Иванов",
							avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
						},
						text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
					},
				]}
				isLoading={false}
			>
				<Index />
			</CommentsBlock>
		</>
	);
};
