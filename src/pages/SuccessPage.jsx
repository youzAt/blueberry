import { useSearchParams } from "react-router-dom";
import MainFooter from "../components/layout/MainFooter";
import MainHeader from "../components/layout/MainHeader";
import Success from "../components/resultState/Success";
import styles from "./SuccessPage.module.css";
const SuccessPage = () => {
	const [searchParams] = useSearchParams();
	const trackingCode = searchParams.get('code');	
	return (
		<>
			<MainHeader />
			<main className={`container ${styles.container}`}>
				<Success trackingCode={trackingCode}/>
			</main>
			<MainFooter />
		</>
	);
};

export default SuccessPage;
