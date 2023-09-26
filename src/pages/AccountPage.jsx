import MainHeader from "../components/MainHeader";
import PasswordSection from "../components/account/PasswordSection";
import PersonalInfoSection from "../components/account/PersonalInfoSection";
import PhoneNumberSection from "../components/account/PhoneNumberSection";
import SideMenu from "../components/account/SideMenu";
import styles from "./AccountPage.module.css";

const AccountPage = () => {
	return (
		<>
			<MainHeader />
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
