import { useEffect } from "react";
import Loader from "../components/UI/Loader";
import useUrl from "../hooks/useUrl";
import { useNavigate, useParams } from "react-router-dom";

const ShortLinkPage = () => {
	const BASE_URL = useUrl();
	const { shortLink } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		const checkShortLink = async () => {
			const res = await fetch(
				`${BASE_URL}api/events/short-link/${shortLink}/`
			);
			const data = await res.json();
			
			if (res.ok) {
				navigate(`/events/${data.slug}`);
			} else {
				navigate("/page-not-found");
			}
		};
		checkShortLink();
	}, [BASE_URL, shortLink, navigate]);
	return <Loader />;
};

export default ShortLinkPage;
