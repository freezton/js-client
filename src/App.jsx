import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import RegisterPage from "./pages/SignUpPage";
import NotesPage from "./pages/NotesPage";
import { AuthProvider, useAuth } from "./context/authContext";
import { ThemeProvider } from "./context/themeContext";

const AppContent = () => {
	const { isAuthenticated, login, logout } = useAuth();
	return (
		<Router>
			<Routes>
				<Route
					path="/notes"
					element={
						isAuthenticated ? (
							<NotesPage onLogout={logout} />
						) : (
							<Navigate to="/login" />
						)
					}
				/>
				<Route
					path="/login"
					element={
						isAuthenticated ? (
							<Navigate to="/notes" />
						) : (
							<AuthPage onLogin={login} />
						)
					}
				/>
				<Route
					path="/register"
					element={
						isAuthenticated ? <Navigate to="/notes" /> : <RegisterPage />
					}
				/>
				<Route path="/" element={<Navigate to="/login" />} />
			</Routes>
		</Router>
	);
};

const App = () => {
	return (
		<AuthProvider>
			<ThemeProvider>
				<AppContent />
			</ThemeProvider>
		</AuthProvider>
	);
};

export default App;
