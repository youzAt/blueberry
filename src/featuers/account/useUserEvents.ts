import { useQuery } from "@tanstack/react-query";
import { fetchUserEvents } from "../../services/apiEvents";

export const useUserEvents = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["userEvents"],
		queryFn: fetchUserEvents,
	});

	return { data, isLoading };
};
