import Box from '../UI/Box'
import tickIcon from '../../assets/icons/tick-circle.svg'
import styles from './ConfirmBox.module.css'
import Button from '../UI/Button'
import closeIcon from '../../assets/icons/close-circle.svg'
import { ReactNode } from 'react'

interface ConfirmBoxProps {
    children: ReactNode;
    btnHandler: () => void;
    isError?: boolean
}
const ConfirmBox = ({children, btnHandler, isError}: ConfirmBoxProps) => {
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
