import { useNavigate } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import PasswordSection from "../components/account/PasswordSection";
import PersonalInfoSection from "../components/account/PersonalInfoSection";
import PhoneNumberSection from "../components/account/PhoneNumberSection";
import SideMenu from "../components/account/SideMenu";
import getAccess from "../funcs/getAccess";
import styles from "./AccountPage.module.css";
import { useEffect, useState } from "react";
const BASE_URL = "https://api-akbarmasoud.iran.liara.run/";

const AccountPage = () => {
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
	}, [token, navigate]);
	return (
		<>
			<MainHeader removeBtn />
			<main className={`container ${styles.accountPage}`}>
				<SideMenu />
				<div>
					<PersonalInfoSection />
					<PhoneNumberSection />
					<PasswordSection />
				</div>
			</main>
		</>
	);
};

export default AccountPage;
