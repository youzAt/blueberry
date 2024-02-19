import MainFooter from "../components/layout/MainFooter";
import MainHeader from "../components/layout/MainHeader";
import styles from "./SuccessPage.module.css";
import FailPay from "../components/resultState/FailPay";
import { useLoaderData } from "react-router-dom";
import { fetchPayDetail } from "../services/apiEvents";

const WaitPayPage = () => {
	const { amount: price, short_link: shortLink } = useLoaderData();

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

export default WaitPayPage;

export const loader = async ({ params }) => {
	const payDetail = await fetchPayDetail(params.eventSlug);

	return payDetail;
};
