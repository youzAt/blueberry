import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";

interface PhoneNumberContextType {
	phoneNumber: string;
	setPhoneNumber: Dispatch<SetStateAction<string>>;
}

const PhoneNumberContext = createContext<PhoneNumberContextType | null>(null);
const PhoneNumberProvider = ({ children }: { children: ReactNode }) => {
	const [phoneNumber, setPhoneNumber] = useState("");

	return (
		<PhoneNumberContext.Provider value={{ phoneNumber, setPhoneNumber }}>
			{children}
		</PhoneNumberContext.Provider>
	);
};

export const usePhoneNumber = () => {
	const context = useContext(PhoneNumberContext);
	if (context === undefined)
		throw new Error("usePhoneNumber is used outside of its provider");
	return context;
};

export default PhoneNumberProvider;
