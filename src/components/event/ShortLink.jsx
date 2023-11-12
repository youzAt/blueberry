import Box from "../UI/Box";
import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from "./ShortLink.module.css";
const ShortLink = ({ link }) => {
	const inputValue = `bberry.id/e/${link}`;
	const copyHandler = () => {
		navigator.clipboard.writeText(inputValue);
		console.log("hello")
	};
	return (
		<Box className={styles.shortLinkBox}>
			<h6>لینک رویداد:</h6>
			<div className={styles.inputBox}>
				<Input disabled value={inputValue} />
				<Button type="outline" onClick={copyHandler}>
					کپی
				</Button>
			</div>
		</Box>
	);
};

export default ShortLink;
