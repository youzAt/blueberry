import Box from "../UI/Box";
import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from "./PersonalInfoSection.module.css";
const PersonalInfoSection = () => {
	return (
		<div className={styles.section}>
			<h5 className={styles.sectionTitle}>اطلاعات فردی</h5>
			<Box className={styles.box}>
				<form>
					<div className={styles.formBox}>
						<div className={styles.inputBox}>
							<label className="caption-lg" htmlFor="first-name">
								نام
							</label>
							<Input
								id="first-name"
								placeholder="نام خود را وارد کنید"
							/>
						</div>
						<div className={styles.inputBox}>
							<label className="caption-lg" htmlFor="last-name">
								نام خانوادگی
							</label>
							<Input
								id="last-name"
								placeholder="نام خانوادگی خود را وارد کنید"
							/>
						</div>
                        
						<div className={styles.inputBox}>
							<label className="caption-lg" htmlFor="meli-code">
								کد ملی
							</label>
							<Input
								id="meli-code"
								placeholder="کد ملی خود را وارد کنید"
							/>
						</div>
						<div className={styles.inputBox}>
							<label
								className="caption-lg"
								htmlFor="student-number"
							>
								شماره دانشجویی
							</label>
							<Input
								id="student-number"
								placeholder="کد ملی خود را وارد کنید"
							/>
						</div>
					</div>
					<Button isSmall type="secondary">
						ذخیره تغییرات
					</Button>
				</form>
			</Box>
		</div>
	);
};

export default PersonalInfoSection;
