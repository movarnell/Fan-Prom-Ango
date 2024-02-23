import React from 'react'
import styles from './DisabledSVG.module.css'
import disabledSeat from '../Assets/Wheelchair_symbol.svg';
const DisabledSVG = () => {
  return (
    <div className={styles.loading}>
      <img className={styles.loadingSVG} src={disabledSeat} alt='Loading' />
    </div>
  )
}

export default DisabledSVG
