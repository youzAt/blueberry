import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";

interface MenuType {
	isMenuOpen: boolean;
	setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const MenuContext = createContext<MenuType | null>(null);

const MenuProvider = ({ children }: { children: ReactNode }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
			{children}
		</MenuContext.Provider>
	);
};

export const useMenu = () => {
	const context = useContext(MenuContext);
	if (context === undefined)
		throw new Error("useMenu is used outside its provider");
	return context;
};

export default MenuProvider;
