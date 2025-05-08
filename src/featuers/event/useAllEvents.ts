import { useQuery } from "@tanstack/react-query";
import { fetchAllEvents } from "../../services/apiEvents";

export const useAllEvents = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["events"],
		queryFn: fetchAllEvents,
	});

	return { data, isLoading };
};
