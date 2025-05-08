import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchEvent } from "../../services/apiEvents";

export const useEvent = () => {
	const { eventSlug } = useParams();
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["event", eventSlug],
		queryFn: () => fetchEvent({ eventSlug: eventSlug as string }),
	});
	return { data, isLoading, isError, error};
};
