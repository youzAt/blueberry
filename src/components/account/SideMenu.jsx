import styles from "./SideMenu.module.css";

import userEditIcon from "../../assets/icons/user-edit.svg";
import walletIcon from "../../assets/icons/wallet.svg";
import noteIcon from "../../assets/icons/note.svg";

import Box from "../UI/Box";
import { NavLink } from "react-router-dom";

const SideMenu = () => {
	return (
		<Box className={styles.box}>
			<div className={styles.sideMenu}>
				<h6>پنل کاربری</h6>
				<ul className={styles.menu}>
					<li  className={styles.menuItem}>
						<NavLink>
							<img src={noteIcon} alt="note icon" />
							<span className="body-md">رویداد های من</span>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink>
							<img src={walletIcon} alt="wallet icon" />
							<span className="body-md">کیف پول</span>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink>
							<img src={userEditIcon} alt="user edit icon" />
							<span className="body-md">ویرایش اطلاعات</span>
						</NavLink>
					</li>
				</ul>
			</div>
		</Box>
	);
};

export default SideMenu;
