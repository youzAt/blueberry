import styles from "./MainHeader.module.css";
import logo from "../../assets/icons/logo-small.svg";
import menuIcon from "../../assets/icons/menu.svg";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { useAuth } from "../../context/AuthProvider";
import { useMenu } from "../../context/MenuProvider";

interface MainHeaderProps {
	removeBtn?: boolean;
	removeMenu?: boolean;
	setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainHeader = ({ removeBtn, removeMenu }: MainHeaderProps) => {
	const { setIsMenuOpen } = useMenu()!;
	const { isLogin } = useAuth();
	const navigate = useNavigate();

	const openMenuHandler = () => {
		setIsMenuOpen(true);
	};
	return (
		<header className={styles.mainHeader}>
			<div className="container">
				{/* logo and nav bar */}
				<div className={styles.navBox}>
					{!removeMenu && (
						<Button
							type="tertiary"
							className={styles.menuIcon}
							onClick={openMenuHandler}
						>
							<img src={menuIcon} alt="menu icon" />
						</Button>
					)}
					<Link to="/events">
						<img src={logo} alt="logo icon" />
					</Link>
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
