import React from 'react'
import styles from './DisabledSVG.module.css'
import disabledSeat from '../Assets/Wheelchair_symbol.svg';
const DisabledSVG = () => {
  return (
    <div className={styles.disabledSVGContainer}>
      <img className={styles.disabledSVG} src={disabledSeat} alt='Loading' />
    </div>
  )
}

export default DisabledSVG
