import { useState } from "react";
import Box from "../UI/Box";
import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from "./ShortLink.module.css";
import tickIcon from "../../assets/icons/tick-circle.svg";
const ShortLink = ({ link }) => {
	const [isCopied, setIsCopied] = useState(false);
	const inputValue = `ssceb.ir/e/${link}`;
	const copyHandler = () => {
		navigator.clipboard.writeText(inputValue);
		setIsCopied(true)
	};
	return (
		<Box className={styles.shortLinkBox}>
			<h6>لینک رویداد:</h6>
			<div className={styles.inputBox}>
				<Input disabled value={inputValue} />
				<Button type="outline" onClick={copyHandler}>
					{isCopied ? <img src={tickIcon} /> : <>کپی</>}
				</Button>
			</div>
		</Box>
	);
};

export default ShortLink;
