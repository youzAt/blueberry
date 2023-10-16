import Box from '../UI/Box'
import tickIcon from '../../assets/icons/tick-circle.svg'
import styles from './ConfirmBox.module.css'
import Button from '../UI/Button'
import closeIcon from '../../assets/icons/close-circle.svg'
const ConfirmBox = ({children, btnHandler, isError}) => {
    return (
        <Box className={styles.confirmBox}>
            <div>
                <img src={isError ? closeIcon : tickIcon} alt="tick icon" />
                <p className='body-md'>{children}</p>
            </div>
            <Button isSmall type='tertiary' onClick={btnHandler}>باشه</Button>
        </Box>
    )
}

export default ConfirmBox
