import Lottie from "react-lottie";
import loaderAniamtion from "../../assets/animation/mes4hkiMGm.json";
import styles from "./Loader.module.css";

const Loader = () => {
	return (
		<div className={styles.loaderContainer}>
			<Lottie
				width={300}
				style={{
					height: "100%"
				}}
				options={{
					animationData: loaderAniamtion,
				}}
			/>
		</div>
	);
};

export default Loader;
