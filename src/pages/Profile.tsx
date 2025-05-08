import PasswordSection from "../featuers/account/PasswordSection";
import PersonalInfoSection from "../featuers/account/PersonalInfoSection";
import PhoneNumberSection from "../featuers/account/PhoneNumberSection";

const Profile = () => {
	return (
		<div>
			<PersonalInfoSection />
			<PhoneNumberSection />
			<PasswordSection />
		</div>
	);
};

export default Profile;
