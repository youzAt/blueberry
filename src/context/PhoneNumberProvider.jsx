import { createContext, useContext, useState } from "react";

const PhoneNumberContext = createContext();

const PhoneNumberProvider = ({ children }) => {
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
}

export default PhoneNumberProvider;
