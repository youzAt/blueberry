import styles from "./EventBanner.module.css";
const EventBanner = ({ src, name }) => {
	return (
		<div className={styles.banner}>
			<img src={src} alt={`${name} banner`} />
		</div>
	);
};

export default EventBanner;
