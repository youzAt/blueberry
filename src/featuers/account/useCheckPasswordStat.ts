import { useQuery } from "@tanstack/react-query";
import { checkPasswordStat } from "../../services/apiUser";

export const useCheckPasswordStat = () => {
	const { data, isLoading } = useQuery({
		queryFn: checkPasswordStat,
		queryKey: ["passStat"],
	});
	return { data, isLoading };
};
