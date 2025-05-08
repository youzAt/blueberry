import { useMutation } from "@tanstack/react-query";
import { validateDiscountCode } from "../../services/apiPayment";

export const useValidateDiscount = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: validateDiscountCode,
	});

	return { mutate, isPending };
};
