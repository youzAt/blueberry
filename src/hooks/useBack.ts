import { useNavigate } from "react-router-dom";

export const useBack = () => {
	const navigate = useNavigate();
	return () => navigate(-1);
};
