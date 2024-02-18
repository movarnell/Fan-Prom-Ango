
import React from 'react'
import styles from './Loading.module.css'
import loading from '../Assets/Loading.svg'
const Loading = () => {
  return (
    <div className={styles.loading}>
      <img className={styles.loadingSVG} src={loading} alt='Loading' />
    </div>
  )
}

export default Loading
