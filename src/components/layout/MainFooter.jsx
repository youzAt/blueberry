import styles from "./MainFooter.module.css";
import instagramIcon from "../../assets/icons/instagram.svg";
import telegramIcon from "../../assets/icons/telegram.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import blueberryLogo from "../../assets/icons/blueberrylogotext.svg";
import basuLogo from "../../assets/icons/basuLogo.svg";

const MainFooter = () => {
	return (
		<footer className={styles.mainFooter}>
			<div className="container">
				<div className={styles.footerLinks}>
					<div>
						<h6 className={styles.listTitle}>
							تازه ترین رویداد ها
						</h6>
						<ul>
							<li className="body-md">
								رقابت های بازی های رایانه ای کانتر ۱.۶
							</li>
							<li className="body-md">سکوی پرتاب الوند</li>
						</ul>
					</div>
					<div>
						<h6 className={styles.listTitle}>دسترسی سریع</h6>
						<ul>
							<li className="body-md">استعلام گواهی</li>
							<li className="body-md">تماس با ما</li>
						</ul>
					</div>
					<div>
						<h6 className={styles.listTitle}>
							بلوبری در شبکه های اجتماعی
						</h6>
						<div className={styles.icons}>
							<a href="#">
								<img src={telegramIcon} alt="telegram logo" />
							</a>
							<a href="#">
								<img src={instagramIcon} alt="instagram logo" />
							</a>
							<a href="#">
								<img src={linkedinIcon} alt="linkedin logo" />
							</a>
						</div>
					</div>
				</div>
				<div className={styles.logos}>
					<img src={basuLogo} alt="Bu-Ali sina university logo" />
					<img src={blueberryLogo} alt="blueberry logo" />
				</div>
			</div>
			<p className={`body-md ${styles.copyRight}`}>
				کلیه حقوق مادی و معنوی این وب سایت برای <span>بلوبری </span>
				محفوظ است
			</p>
		</footer>
	);
};

export default MainFooter;
