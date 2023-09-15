import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/login/LoginForm";
import LoginPasswordForm from "./components/login/LoginPasswordForm";
import LoginOtpForm from "./components/login/LoginOtpForm";
import { useState } from "react";
import AccountPage from "./pages/AccountPage";

// const styles = {
// 	display: "flex",
// 	alignItems: "center",
// 	justifyContent: "center",
// 	height: "100vh",
// 	gap: "500px",
// };

const App = () => {
	const [phoneNumber, setPhoneNumber] = useState("");

	return (
		<BrowserRouter>
			<Routes>
				<Route path="login" element={<LoginPage />}>
					<Route
						index
						element={
							<LoginForm
								phoneNumber={phoneNumber}
								setPhoneNumber={setPhoneNumber}
							/>
						}
					/>
					<Route
						path="password"
						element={
							<LoginPasswordForm phoneNumber={phoneNumber} />
						}
					/>
					<Route
						path="otp"
						element={<LoginOtpForm phoneNumber={phoneNumber} />}
					/>
				</Route>
				<Route
					path="my-account"
					element={
						<AccountPage
							phoneNumber={phoneNumber}
							setPhoneNumber={setPhoneNumber}
						/>
					}
				></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
