import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Routes from "./Routes";
import AuthProvider from "./context/AuthProvider";
import PhoneNumberProvider from "./context/PhoneNumberProvider";
import NextUrlProvider from "./context/NextUrlProvider";
import MenuProvider from "./context/MenuProvider";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<AuthProvider>
				<PhoneNumberProvider>
					<NextUrlProvider>
						<MenuProvider>
							<Routes />
						</MenuProvider>
					</NextUrlProvider>
				</PhoneNumberProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
