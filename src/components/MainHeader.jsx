import styles from "./MainHeader.module.css";
import logo from "../assets/icons/logo-small.svg";
import { Link } from "react-router-dom";

const MainHeader = ({ children }) => {
	return (
		<header className={styles.mainHeader}>
			<div className="container">
				{/* logo and nav bar */}
				<div className={styles.navBox}>
					<img src={logo} alt="logo icon" />
					<nav>
						<ul>
							<li className="body-md">
								<Link to="/events"> رویداد ها </Link>
							</li>
						</ul>
					</nav>
				</div>
				{/* buttons */}
				<div>{children}</div>
			</div>
		</header>
	);
};

export default MainHeader;
