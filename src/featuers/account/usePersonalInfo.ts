import { useQuery } from "@tanstack/react-query";
import { fetchPersonalInfo } from "../../services/apiUser";

export const usePersonalInfo = () => {
    const {data, isLoading} = useQuery({
        queryFn: fetchPersonalInfo,
        queryKey: ["personalInfo"],
    })

    return {data, isLoading};
};