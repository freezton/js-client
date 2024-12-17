import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../api/logout";
import { AuthProvider, useAuth } from "../../context/authContext";

const HeaderWrapper = styled.div`
	height: 50px;
	/* background-color: ${({ theme }) => theme.headerBackground || "#333"}; */
	background-color: rgba(5, 5, 5, 0.8);
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid ${({ theme }) => theme.headerBorderColor || "#444"};
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	padding: 0 20px;
	font-family: "Roboto", sans-serif;
`;

const Title = styled.h1`
	font-size: 20px;
	margin: 0;
	font-weight: 600;
	letter-spacing: 1px;
`;

const Button = styled(NavLink)`
	background-color: ${({ color }) => color || "#007bff"};
	color: white;
	border: none;
	padding: 5px 10px;
	margin-left: 10px;
	font-size: 14px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.2s ease;
	text-decoration: none;

	&:hover {
		background-color: ${({ hoverColor }) => hoverColor || "#0056b3"};
	}
`;

const LogoutButton = styled(Button)`
	background-color: #ff4d4d;
	&:hover {
		background-color: #ff1a1a;
	}
`;

const NewNoteButton = styled(Button)`
	background-color: #28a745;
	&:hover {
		background-color: #218838;
	}
`;

const Header = ({ onCreateNote }) => {
	const { contextLogout } = useAuth();

	const handleLogout = async () => {
		const success = await logout();
		if (success) {
			contextLogout();
		} else {
			alert("Error while logging out. Please try again.");
		}
	};

	return (
		<HeaderWrapper>
			<AuthProvider>
				<NewNoteButton onClick={() => onCreateNote("New Note")}>
					New note
				</NewNoteButton>
				<Title>notes.md</Title>
				<LogoutButton to="/login" onClick={handleLogout}>
					Logout
				</LogoutButton>
			</AuthProvider>
		</HeaderWrapper>
	);
};

export default Header;
