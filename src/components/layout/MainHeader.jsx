import styles from "./MainHeader.module.css";
import logo from "../../assets/icons/logo-small.svg";
import menuIcon from "../../assets/icons/menu.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import useUrl from "../../hooks/useUrl";


const MainHeader = ({ removeBtn, setIsMenuOpen }) => {
	const BASE_URL = useUrl();
	const [isLogin, setIsLogin] = useState(false);
	const token = localStorage.getItem("blueberry-access");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEvents = async () => {
			const res = await fetch(BASE_URL + "api/account/phone-number/", {
				method: "GET",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			if (!res.ok) {
				setIsLogin(false);
			} else {
				setIsLogin(true);
			}
		};
		fetchEvents();
	}, [token, BASE_URL]);

	const openMenuHandler = () => {
		setIsMenuOpen(true);
	};
	return (
		<header className={styles.mainHeader}>
			<div className="container">
				{/* logo and nav bar */}
				<div className={styles.navBox}>
					<Button
						type="tertiary"
						className={styles.menuIcon}
						onClick={openMenuHandler}
					>
						<img src={menuIcon} alt="menu icon" />
					</Button>
					<img src={logo} alt="logo icon" />
					<nav className={styles.navbar}>
						<ul>
							<li className="body-md">
								<Link to="/events"> رویداد ها </Link>
							</li>
						</ul>
					</nav>
				</div>

				{!removeBtn && (
					<div>
						{isLogin ? (
							<Button
								type="outline"
								onClick={() => {
									navigate("/my-account");
								}}
							>
								حساب کاربری
							</Button>
						) : (
							<Button
								type="primary"
								onClick={() => {
									navigate("/login");
								}}
							>
								ورود یا ثبت نام
							</Button>
						)}
					</div>
				)}
			</div>
		</header>
	);
};

export default MainHeader;
