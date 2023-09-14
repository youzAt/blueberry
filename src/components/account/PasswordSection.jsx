import styles from "./PasswordSection.module.css";
import Box from "../UI/Box";
import Input from "../UI/Input";
import Button from "../UI/Button";
const PasswordSection = () => {
	return (
		<div className={styles.section}>
			<h5 className={styles.sectionTitle}>افزودن رمز عبور</h5>
			<Box className={styles.box}>
				<form>
					<div className={styles.inputBox}>
						<label className="caption-lg" htmlFor="password">
							رمز عبور
						</label>
						<Input
							id="password"
							placeholder="رمز عبور خود را وارد کنید"
							type="password"
						/>
					</div>
					<div className={styles.inputBox}>
						<label
							className="caption-lg"
							htmlFor="password-confirm"
						>
							تکرار رمز عبور
						</label>
						<Input
							id="password-confirm"
							placeholder="رمز عبور خود را دوباره وارد کنید"
							type="password"
						/>
					</div>

					<Button isSmall type="secondary">
						افزودن رمز عبور
					</Button>
				</form>
			</Box>
		</div>
	);
};

export default PasswordSection;
