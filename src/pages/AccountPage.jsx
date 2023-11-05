import { Outlet, useNavigate } from "react-router-dom";
import MainHeader from "../components/layout/MainHeader";
import SideMenu from "../components/account/SideMenu";
import getAccess from "../funcs/getAccess";
import styles from "./AccountPage.module.css";
import { useEffect, useState } from "react";
import MainFooter from "../components/layout/MainFooter";
import useUrl from "../hooks/useUrl";

const AccountPage = () => {
	const BASE_URL = useUrl();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();
	const [token, setToken] = useState(() => {
		return localStorage.getItem("blueberry-access");
	});
	useEffect(() => {
		const loginCheck = async () => {
			const res = await fetch(`${BASE_URL}api/account/phone-number/`, {
				method: "GET",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			if (!res.ok) {
				getAccess(setToken);
			}
		};
		loginCheck();
		navigate("./my-events");
	}, [token, BASE_URL]);
	return (
		<>
			<MainHeader removeBtn setIsMenuOpen={setIsMenuOpen} />
			<main className={`container ${styles.accountPage}`}>
				<SideMenu
					setIsMenuOpen={setIsMenuOpen}
					isMenuOpen={isMenuOpen}
				/>
				<>{<Outlet />}</>
			</main>
			<MainFooter />
		</>
	);
};

export default AccountPage;
