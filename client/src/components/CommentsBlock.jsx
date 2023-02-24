import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";

export const CommentsBlock = ({ items, children, isLoading = true }) => {
	return (
		<SideBlock title="Comment">
			<List>
				{(isLoading ? [...Array(5)] : items).map((obj, index) => (
					<React.Fragment key={index}>
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								{isLoading ? (
									<Skeleton variant="circular" width={40} height={40} />
								) : (
									<Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
								)}
							</ListItemAvatar>
							{isLoading ? (
								<div className="flex flex-col">
									<Skeleton variant="text" height={25} width={120} />
									<Skeleton variant="text" height={18} width={230} />
								</div>
							) : (
								<ListItemText
									primary={obj.user.fullName}
									secondary={obj.text}
								/>
							)}
						</ListItem>
						<Divider variant="inset" component="li" />
					</React.Fragment>
				))}
			</List>
			{children}
		</SideBlock>
	);
};
