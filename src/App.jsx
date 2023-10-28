import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/login/LoginForm";
import LoginPasswordForm from "./components/login/LoginPasswordForm";
import LoginOtpForm from "./components/login/LoginOtpForm";
import { useState } from "react";
import AccountPage from "./pages/AccountPage";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import EventSignupPage from "./pages/EventSignupPage";
import HomePage from "./pages/HomePage";
import SuccessPage from "./pages/SuccessPage";
import ProfilePage from "./pages/ProfilePage";
import MyEventPage from "./pages/MyEventPage";
import WalletPage from "./pages/WalletPage";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
	const [phoneNumber, setPhoneNumber] = useState("");

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage />} />
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
				<Route path="my-account" element={<AccountPage />}>
					<Route path="profile" element={<ProfilePage />} />
					<Route path="my-events" element={<MyEventPage />} />
					<Route path="wallet" element={<WalletPage />} />
				</Route>
				<Route path="events" element={<EventsPage />} />
				<Route path="events/:eventSlug" element={<EventPage />} />
				<Route path="signup/:eventSlug" element={<EventSignupPage />} />
				<Route
					path="events/:eventSlug/signup-success"
					element={<SuccessPage />}
				/>
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
