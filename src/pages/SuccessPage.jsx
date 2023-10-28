import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";
import Success from "../components/resultState/Success";
import styles from "./SuccessPage.module.css";
const SuccessPage = () => {
	return (
		<>
			<MainHeader />
			<main className={`container ${styles.container}`}>
				<Success />
			</main>
			<MainFooter />
		</>
	);
};

export default SuccessPage;
