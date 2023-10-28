import styles from "./SideMenu.module.css";

import userEditIcon from "../../assets/icons/user-edit.svg";
import walletIcon from "../../assets/icons/wallet.svg";
import noteIcon from "../../assets/icons/note.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import rightArrowIcon from "../../assets/icons/arrow-right.svg";

import Box from "../UI/Box";
import Button from "../UI/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";

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
			<Button
				className={styles.logoutBtn}
				type="tertiary"
				isSmall
				onClick={logoutHandler}
			>
				<img src={logoutIcon} alt="logout icon" />
				خروج از حساب
			</Button>
		</Box>
	);
};

export default SideMenu;
