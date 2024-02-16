// import { useSearchParams } from "react-router-dom";
import MainFooter from "../components/layout/MainFooter";
import MainHeader from "../components/layout/MainHeader";
// import Success from "../components/resultState/Success";
import styles from "./SuccessPage.module.css";
import FailPay from "../components/resultState/FailPay";
import { useEffect, useState } from "react";
import useUrl from "../hooks/useUrl";
import getAccess from "../funcs/getAccess";
import { useNavigate } from "react-router-dom";
const WaitPay = () => {
	const BASE_URL = useUrl();
	const [price, setPrice] = useState("");
	const [shortLink, setShortLink] = useState("");
	const [token, setToken] = useState(() => {
		return localStorage.getItem("blueberry-access");
	});
	const eventSlug = window.location.pathname.split("/").at(-2);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEventPayAmount = async () => {
			const res = await fetch(
				`${BASE_URL}api/event/pay/${eventSlug}/`,
				{
					method: "GET",
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await res.json();
			if (!res.ok && res.status === 401) {
				getAccess(setToken);
			} else if (!res.ok && res.status === 404) {
				navigate("/event-not-fount");
			}else if(!res.ok && res.status === 403){
				navigate("/events")
			} else {
				setPrice(data.amount)
				setShortLink(data.short_link)
			}
		};
		fetchEventPayAmount();
	}, [eventSlug, token, navigate, BASE_URL]);
	return (
		<>
			<MainHeader removeMenu />
			<main className={`container ${styles.container}`}>
				<FailPay price={price} shortLink={shortLink} />
			</main>
			<MainFooter />
		</>
	);
};

export default WaitPay;
