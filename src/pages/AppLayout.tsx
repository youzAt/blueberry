import { Outlet } from "react-router-dom";
import MainFooter from "../featuers/layout/MainFooter";
import styles from "./AppLayout.module.css";
import MainHeader from "../featuers/layout/MainHeader";

const AppLayout = () => {
	const location = window.location.pathname;
	
	const hasBtn = location.includes('my-account')
	return (
		<div className={styles.layout}>
			<MainHeader removeBtn={hasBtn} removeMenu={!hasBtn} />
			<main className={styles.main}>
				<Outlet />
			</main>
			<MainFooter />
		</div>
	);
};

export default AppLayout;
