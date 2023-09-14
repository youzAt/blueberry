import styles from './Box.module.css'
const Box = ({className="", children}) => {
    const classes = `${className} ${styles.box}`
    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Box
