import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/login/LoginForm";
import LoginPasswordForm from "./components/login/LoginPasswordForm";
import LoginOtpForm from "./components/login/LoginOtpForm";
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
import CertificatePage from "./pages/CertificatePage";
import WaitPay from "./pages/WaitPay";
import PhoneNumberProvider from "./context/PhoneNumberProvider";
import NextUrlProvider from "./context/NextUrlProvider";

const router = createBrowserRouter([
	{ index: true, element: <HomePage /> },
	{
		path: "/login",
		element: <LoginPage />,
		children: [
			{ index: true, element: <LoginForm /> },
			{ path: "password", element: <LoginPasswordForm /> },
			{ path: "otp", element: <LoginOtpForm /> },
		],
	},
	{
		path: "/my-account",
		element: <AccountPage />,
		children: [
			{ path: "profile", element: <ProfilePage /> },
			{ path: "my-events", element: <MyEventPage /> },
			{ path: "wallet", element: <WalletPage /> },
		],
	},
	{ path: "/events", element: <EventsPage /> },
	{ path: "/events/:eventSlug", element: <EventPage /> },
	{ path: "/signup/:eventSlug", element: <EventSignupPage /> },
	{ path: "/events/:eventSlug/signup-success", element: <SuccessPage /> },
	{ path: "/events/:eventSlug/signup-waiting", element: <WaitPay /> },
	{ path: "/events/:eventSlug/ticket", element: <TicketPage /> },
	{ path: "/e/:shortLink", element: <ShortLinkPage /> },
	{ path: "/c/:cerId", element: <CertificatePage /> },
]);

const App = () => {
	return (
		<UrlProvider>
			<PhoneNumberProvider>
				<NextUrlProvider>
					<RouterProvider router={router} />
				</NextUrlProvider>
			</PhoneNumberProvider>
		</UrlProvider>
	);
};


export default App;

/*
<Routes>
	<Route index element={<HomePage />} />
	<Route path="login" element={<LoginPage />}>
		<Route index element={<LoginForm/>} />
		<Route path="password" element={ <LoginPasswordForm />}/>
		<Route path="otp" element={ <LoginOtpForm/>}/>
	</Route>
	<Route path="my-account" element={<AccountPage />}>
		<Route path="profile" element={<ProfilePage />} />
		<Route path="my-events" element={<MyEventPage />} />
		<Route path="wallet" element={<WalletPage />} />
	</Route>
	<Route path="events" element={<EventsPage/>} />
	<Route path="events/:eventSlug" element={<EventPage />} />
	<Route path="signup/:eventSlug" element={<EventSignupPage />} />
	<Route path="events/:eventSlug/signup-success" element={<SuccessPage />} />
	<Route path="events/:eventSlug/signup-waiting" element={<WaitPay />} />
	<Route path="events/:eventSlug/ticket" element={<TicketPage />} />
	<Route path="e/:shortLink" element={<ShortLinkPage />} />
	<Route path="c/:cerId" element={<CertificatePage />} />
	<Route path="*" element={<ErrorPage />} />
</Routes>*/