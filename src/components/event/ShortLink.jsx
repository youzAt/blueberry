import Box from "../UI/Box";
import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from "./ShortLink.module.css";
const ShortLink = () => {
	return (
		<Box className={styles.shortLinkBox}>
			<h6>لینک رویداد:</h6>
			<div className={styles.inputBox}>
				<Input />
				<Button>کپی</Button>
			</div>
		</Box>
	);
};

export default ShortLink;
