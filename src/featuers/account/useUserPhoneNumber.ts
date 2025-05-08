import { useQuery } from "@tanstack/react-query";
import { fetchUserPhoneNumber } from "../../services/apiUser";

export const useUserPhoneNumber = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["phone-number"],
		queryFn: fetchUserPhoneNumber,
	});
	return { data, isLoading };
};
