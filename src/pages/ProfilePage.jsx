import PasswordSection from "../components/account/PasswordSection";
import PersonalInfoSection from "../components/account/PersonalInfoSection";
import PhoneNumberSection from "../components/account/PhoneNumberSection";
const ProfilePage = () => {
	return (
		<div>
			<PersonalInfoSection />
			<PhoneNumberSection />
			<PasswordSection />
		</div>
	);
};

export default ProfilePage;
