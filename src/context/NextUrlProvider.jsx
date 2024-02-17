import { createContext, useContext, useState } from "react";

const NextUrlContext = createContext()

const NextUrlProvider = ({children}) => {
	const [nextUrl, setNextUrl] = useState("");

    return (
        <NextUrlContext.Provider value={{nextUrl, setNextUrl}}>
            {children}
        </NextUrlContext.Provider>
    )
}

export const useNextUrl = () => {
    const context = useContext(NextUrlContext)
    if (context === undefined)
        throw new Error("useNextUrl is used outside its provider")
    return context
}

export default NextUrlProvider
