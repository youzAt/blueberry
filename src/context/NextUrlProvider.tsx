import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";

interface NextUrlType {
	nextUrl: string;
	setNextUrl: Dispatch<SetStateAction<string>>;
}

const NextUrlContext = createContext<NextUrlType | null>(null);

const NextUrlProvider = ({ children }: {children: ReactNode}) => {
	const [nextUrl, setNextUrl] = useState("");

	return (
		<NextUrlContext.Provider value={{ nextUrl, setNextUrl }}>
			{children}
		</NextUrlContext.Provider>
	);
};

export const useNextUrl = () => {
	const context = useContext(NextUrlContext);
	if (context === undefined)
		throw new Error("useNextUrl is used outside its provider");
	return context;
};

export default NextUrlProvider;
