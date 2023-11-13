import {
	BrowserRouter,
	Route,
	Routes,
	useSearchParams,
} from "react-router-dom";
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
import TicketPage from "./pages/TicketPage";
import { UrlProvider } from "./context/UrlProvider";
import ShortLinkPage from "./pages/ShortLinkPage";

const App = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [nextUrl, setNextUrl] = useState("");

	return (
		<UrlProvider>
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
								<LoginPasswordForm
									phoneNumber={phoneNumber}
									nextUrl={nextUrl}
								/>
							}
						/>
						<Route
							path="otp"
							element={
								<LoginOtpForm
									phoneNumber={phoneNumber}
									nextUrl={nextUrl}
								/>
							}
						/>
					</Route>
					<Route path="my-account" element={<AccountPage />}>
						<Route path="profile" element={<ProfilePage />} />
						<Route path="my-events" element={<MyEventPage />} />
						<Route path="wallet" element={<WalletPage />} />
					</Route>
					<Route
						path="events"
						element={<EventsPage setNextUrl={setNextUrl} />}
					/>
					<Route
						path="events/:eventSlug"
						element={<EventPage setNextUrl={setNextUrl} />}
					/>
					<Route
						path="signup/:eventSlug"
						element={<EventSignupPage />}
					/>
					<Route
						path="events/:eventSlug/signup-success"
						element={<SuccessPage />}
					/>
					<Route
						path="events/:eventSlug/ticket"
						element={<TicketPage />}
					/>
					<Route path="e/:shortLink" element={<ShortLinkPage />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
		</UrlProvider>
	);
};

export default App;
