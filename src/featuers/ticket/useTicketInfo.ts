import { useQuery } from "@tanstack/react-query";
import { fetchTicketInfo } from "../../services/apiEvents";
import { useParams } from "react-router-dom";

export const useTicketInfo = () => {
	const { eventSlug } = useParams();
	const { data, isLoading } = useQuery({
		queryKey: ["ticketInfo", eventSlug],
		queryFn: () => fetchTicketInfo({ eventSlug: eventSlug as string }),
	});

	return { data, isLoading };
};
