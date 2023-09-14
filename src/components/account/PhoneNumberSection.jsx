import styles from "./PhoneNumberSection.module.css";
import Box from "../UI/Box";
import Input from "../UI/Input";
import Button from "../UI/Button";

const PhoneNumberSection = ({phoneNumber}) => {
	return (
		<div className={styles.section}>
			<h5 className={styles.sectionTitle}>شماره موبایل</h5>
			<Box className={styles.box}>
				<form>
					<div className={styles.inputBox}>
						<label className="caption-lg" htmlFor="phone-number">
							شماره موبایل
						</label>
						<Input
							value={phoneNumber}
							id="phone-number"
							placeholder="شماره موبایل خود را وارد کنید"
						/>
					</div>

					<Button isSmall type="secondary">
						ارسال کد تائید
					</Button>
				</form>
			</Box>
		</div>
	);
};

export default PhoneNumberSection;
