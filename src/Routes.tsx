import {
	createBrowserRouter,
	Navigate,
	RouteObject,
	RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import LoginForm from "./featuers/login/LoginForm";
import LoginPasswordForm from "./featuers/login/LoginPasswordForm";
import LoginOtpForm from "./featuers/login/LoginOtpForm";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Event from "./pages/Event";
import EventSignup from "./pages/EventSignup";
import MyEvent from "./pages/MyEvent";
import Ticket from "./pages/Ticket";
import ShortLink from "./pages/ShortLink";
import Error from "./pages/Error";
import Certificate from "./pages/Certificate";
import Events from "./pages/Events";
import NonAuthRoutes from "./pages/NonAuthRoutes";
import AuthOnlyRoutes from "./pages/AuthOnlyRoutes";
import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import WaitPay from "./pages/WaitPay";
import Success from "./pages/Success";

const publicRoutes: RouteObject[] = [
	{
		element: <AppLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "/events", element: <Events /> },
			{ path: "/events/:eventSlug", element: <Event /> },
			{ path: "/c/:cerId", element: <Certificate /> },
			{ path: "*", element: <Error /> },
		],
	},
	{ path: "/e/:shortLink", element: <ShortLink /> },
];

const authOnlyRoutes: RouteObject[] = [
	{
		element: <AuthOnlyRoutes />,
		children: [
			{
				element: <AppLayout />,
				children: [
					{
						path: "/my-account",
						element: <Account />,
						children: [
							{ index: true,element: <Navigate to="my-events" />},
							{ path: "my-events", element: <MyEvent /> },
							{ path: "profile", element: <Profile /> },
							{ path: "wallet", element: <Wallet /> },
						],
					},
					{ path: "/signup/:eventSlug", element: <EventSignup />},
					{ path: "/events/:eventSlug/signup-waiting", element: <WaitPay />},
					{ path: "/events/:eventSlug/signup-success", element: <Success />},
					{ path: "/events/:eventSlug/ticket", element: <Ticket />},
				],
			},
		],
	},
];

const notAuthOnlyRoutes: RouteObject[] = [
	{
		element: <NonAuthRoutes />,
		children: [
			{
				path: "login",
				element: <Login />,
				children: [
					{index: true,element: <LoginForm />},
					{path: "password",element: <LoginPasswordForm />},
					{path: "otp",element: <LoginOtpForm />},
				],
			},
		],
	},
];

const Routes = () => {
	const router = createBrowserRouter([
		...publicRoutes,
		...authOnlyRoutes,
		...notAuthOnlyRoutes,
	]);
	return <RouterProvider router={router} />;
};

export default Routes;
