import styles from './NavBar.module.css'
const NavBar = () => {
    return (
            <div className={styles.navBox}>
                <img src={logo} alt="logo icon" />
                <nav>
                    <ul>
                        <li className="body-md">رویداد ها</li>
                    </ul>
                </nav>
            </div>
    )
}

export default NavBar
