import { useQuery } from "@tanstack/react-query";
import { fetchUserBalance } from "../../services/apiPayment";

export const useBalance = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["balance"],
		queryFn: fetchUserBalance,
	});
	return { data: data?.balance, isLoading };
};
