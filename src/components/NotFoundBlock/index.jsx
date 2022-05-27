import React from 'react'

import styles from './NotFoundBlock.module.scss'


const NotFoundBlock = () => {
  return (
      <div className={styles.root}>
          <span className={styles.icon}>😕</span>
          <br />
          <h1 className={styles.title}>NotFound</h1>
          <p className={styles.text}>К сожалению такая страница не найдена</p>
      </div>
  )
}

export default NotFoundBlock