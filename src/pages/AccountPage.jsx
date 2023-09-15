import MainHeader from "../components/MainHeader";
import PasswordSection from "../components/account/PasswordSection";
import PersonalInfoSection from "../components/account/PersonalInfoSection";
import PhoneNumberSection from "../components/account/PhoneNumberSection";
import SideMenu from "../components/account/SideMenu";
import styles from "./AccountPage.module.css";

const AccountPage = ({ phoneNumber, setPhoneNumber }) => {
	return (
		<>
			<MainHeader />
			<main className={`container ${styles.accountPage}`}>
				<SideMenu />
				<div>
					<PersonalInfoSection />
					<PhoneNumberSection
						phoneNumber={phoneNumber}
						setPhoneNumber={setPhoneNumber}
					/>
					<PasswordSection phoneNumber={phoneNumber} />
				</div>
			</main>
		</>
	);
};

export default AccountPage;
