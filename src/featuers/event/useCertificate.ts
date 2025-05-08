import { useQuery } from "@tanstack/react-query";
import { fetchCertificate } from "../../services/apiEvents";
import { useParams } from "react-router-dom";

export const useCertificate = () => {
	const { cerId } = useParams();
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ["certificate"],
		queryFn: () => fetchCertificate({ cerId: cerId as string }),
		retry: 1,
	});
	return { data, isLoading, isError, isSuccess };
};
