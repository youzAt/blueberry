import { createPortal } from "react-dom";
import Box from "../UI/Box";
import styles from "./LoginModal.module.css";
import Button from "../UI/Button";
const LoginModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;
	return createPortal(
		<div className={styles.overlay}>
			<Box className={styles.modal}>
				<Button onClick={onClose}>بستن</Button>
				<h5>برای ثبت نام ابتدا وارد شوید</h5>
			</Box>
		</div>,
		document.getElementById("modal")
	);
};

export default LoginModal;
