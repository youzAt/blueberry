import styles from './Box.module.css'
const Box = ({className="", children, ref}) => {
    const classes = `${className} ${styles.box}`
    return (
        <div className={classes} ref={ref}>
            {children}
        </div>
    )
}

export default Box
