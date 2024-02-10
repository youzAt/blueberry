import styles from "./SideMenu.module.css";

import userEditIcon from "../../assets/icons/user-edit.svg";
import walletIcon from "../../assets/icons/wallet.svg";
import noteIcon from "../../assets/icons/note.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import rightArrowIcon from "../../assets/icons/arrow-right.svg";
import blueberryLogo from "../../assets/icons/blueberrylogotext.svg";


import Box from "../UI/Box";
import Button from "../UI/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";

const SideMenu = ({ setIsMenuOpen, isMenuOpen }) => {
	const navigate = useNavigate();
	const logoutHandler = () => {
		localStorage.removeItem("blueberry-access");
		localStorage.removeItem("blueberry-refresh");
		navigate("/events");
	};
	const closeMenuHandler = () => {
		setIsMenuOpen(false);
	};
	return (
		<Box className={`${styles.box} ${isMenuOpen && styles.active}`}>
			<div className={styles.sideMenu}>
				<h6 className={styles.menuTitle}>پنل کاربری</h6>
				<Button
					className={styles.closeBtn}
					type="tertiary"
					isSmall
					onClick={closeMenuHandler}
				>
					<img src={rightArrowIcon} alt="right arrow icon" />
					بازگشت
				</Button>
				<ul className={styles.menu}>
					<li className={styles.menuItem}>
						<NavLink
							onClick={closeMenuHandler}
							to="./my-events"
							className={({ isActive }) => {
								return isActive ? styles.active : undefined;
							}}
						>
							<img src={noteIcon} alt="note icon" />
							<span className="button-sm">رویداد های من</span>
						</NavLink>
					</li>

					<li className={styles.menuItem}>
						<NavLink
							onClick={closeMenuHandler}
							to="./profile"
							className={({ isActive }) => {
								return isActive ? styles.active : undefined;
							}}
						>
							<img src={userEditIcon} alt="user edit icon" />
							<span className="button-sm">اطلاعات فردی</span>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							onClick={closeMenuHandler}
							to="./wallet"
							className={({ isActive }) => {
								return isActive ? styles.active : undefined;
							}}
						>
							<img src={walletIcon} alt="wallet icon" />
							<span className="button-sm">کیف پول</span>
						</NavLink>
					</li>
				</ul>
			</div>
			<Button
				className={styles.logoutBtn}
				type="tertiary"
				isSmall
				onClick={logoutHandler}
			>
				<img src={logoutIcon} alt="logout icon" />
				خروج از حساب
			</Button>
			<Link to="/events" className={styles.blueLogo}>
				<img src={blueberryLogo} alt="Blueberry logo" />
			</Link>
		</Box>
	);
};

export default SideMenu;
