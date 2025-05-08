import { useMutation } from "@tanstack/react-query";
import { sendSignUpData } from "../../services/apiEvents";
import { useParams } from "react-router-dom";

export const useSignup = () => {
	const { eventSlug } = useParams();
	const { mutate, isPending} = useMutation({
		mutationFn: (signupData: { [props: string]: string }) =>
			sendSignUpData({ eventSlug: eventSlug as string, signupData }),

	});
	return { mutate, isPending };
};
