import styles from './discountBadge.module.css'
const DiscountBadge = ({children}) => {
    return (
        <span className={`body-md ${styles.discount}`}>
            %{children}
        </span>
    )
}

export default DiscountBadge
