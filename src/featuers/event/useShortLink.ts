import { useQuery } from "@tanstack/react-query";
import { fetchShortLinkEvent } from "../../services/apiEvents";
import { useParams } from "react-router-dom";

export const useShortLink = () => {
	const { shortLink } = useParams();
	const { data, isLoading,isError, isSuccess } = useQuery({
		queryKey: ["shortLink"],
		queryFn: () => fetchShortLinkEvent({ shortLink: shortLink as string }),
        retry: 1
        
	});

    return {data, isLoading, isError, isSuccess}
};
