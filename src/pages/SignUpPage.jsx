import React, { useState } from "react";
import styled from "styled-components";
import { signUp } from "../api/signUp";
import { NavLink, useNavigate } from "react-router-dom";

const RegisterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-image: url("/bg.png");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`;

const RegisterForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const FormWrapper = styled.div`
	width: 100%;
	height: 30%;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	backdrop-filter: blur(20px);
	padding: 30px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
	margin-bottom: 7%;
`;

const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 25%;
	/* max-width: 600px; */
`;

const Input = styled.input`
	padding: 12px;
	font-size: 16px;
	border: 1px solid #444;
	border-radius: 8px;
	background-color: #222;
	color: #fff;
	::placeholder {
		color: #bbb;
	}
`;
const Button = styled.button`
	padding: 12px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	font-size: 16px;
	transition: background-color 0.3s;

	&:hover {
		background-color: #0056b3;
	}
`;

const LinkButton = styled(NavLink)`
	background: none;
	color: #007bff;
	border: none;
	text-decoration: underline;
	cursor: pointer;
	font-size: 14px;
	transition: color 0.3s;

	&:hover {
		color: #0056b3;
	}
`;

const RegisterPage = () => {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();
		if (login.length < 5) {
			setError('Login length must be 5 symbols or more')
			return;
		}
		if (password.length < 4) {
			setError('Password length must be 4 symbols or more')
			return;
		}
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			const success = await signUp(login, password);
			if (success) {
				navigate("/login");
			} else {
				setError("Registration failed. Please try again.");
			}
		} catch {
			setError("An error occurred. Please try again.");
		}
	};

	return (
		<RegisterWrapper>
			<FormWrapper>
				<InnerWrapper>
					<RegisterForm onSubmit={handleSubmit}>
						<Input
							type="text"
							placeholder="Login"
							value={login}
							onChange={e => setLogin(e.target.value)}
						/>
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<Input
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
						/>
						{error && <p style={{ color: "red" }}>{error}</p>}
						<Button type="submit">Register</Button>
					</RegisterForm>
					<LinkButton to="/login">Already have an account? Login</LinkButton>
				</InnerWrapper>
			</FormWrapper>
		</RegisterWrapper>
	);
};

export default RegisterPage;
