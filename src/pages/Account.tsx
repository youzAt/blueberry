import styles from "./Account.module.css";
import { Outlet } from "react-router-dom";
import SideMenu from "../featuers/account/SideMenu";

const Account = () => {
	document.title = "Blue Berry | Account";
	return (
		<div className={`container ${styles.accountPage}`}>
			<SideMenu className={styles.sideMenu} />
			<Outlet />
		</div>
	);
};

export default Account;
