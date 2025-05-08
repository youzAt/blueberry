import { useQuery } from "@tanstack/react-query";
import { fetchEventSignupFormFields } from "../../services/apiEvents";
import { useParams } from "react-router-dom";

export const useEventSignupFields = () => {
	const { eventSlug } = useParams();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["signupFields", eventSlug],
		queryFn: () =>
			fetchEventSignupFormFields({ eventSlug: eventSlug as string }),
	});

	return { data, isLoading, isError };
};
