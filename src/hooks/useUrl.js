import { UrlContext } from "../context/UrlProvider";
import { useContext } from "react";
const useUrl = () => {
	const context = useContext(UrlContext);
	if (context === undefined)
		throw new Error("useUrl is used outside of its provider");
	return context;
};
export default useUrl;
