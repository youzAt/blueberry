import Lottie from "lottie-react";
import loaderAniamtion from "../../assets/animation/mes4hkiMGm.json";
import styles from './Loader.module.css'

const Loader = () => {
	return (
		<div className={styles.loaderContainer}>
			<Lottie className={styles.loader} animationData={loaderAniamtion}  />
			
		</div>
	);
};

export default Loader;
