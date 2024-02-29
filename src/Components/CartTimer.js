import React from 'react'
import styles from './CartTimer.module.css'
const CartTimer = ({ timer }) => {
//secons is the time left to complete the purchase, 300 is the time limit in seconds. 
    const seconds = 300 - timer;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        
                <div className={seconds <= 60 ? styles.cartTimerRed : styles.cartTimerOrange} >
                 <p className='text-light'> You have {minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds} to complete your purchase
                </p> </div>
            
        
    )
}

export default CartTimer