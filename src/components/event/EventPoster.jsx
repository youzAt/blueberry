import styles from "./EventPoster.module.css";
const EventPoster = ({ src, name }) => {
	return (
		<div className={styles.poster}>
			<img src={src} alt={`${name} event poster`} />
		</div>
	);
};

export default EventPoster;
