import React from 'react'

import styles from './Checkbox.module.scss'

const Checkbox = ({ label, name, register, error, rules }) => {
  return (
    <div className={styles.agree}>
      <input className={styles.checkbox} id={name} type="checkbox" name={name} {...register(name, rules)} />
      <label className={styles.checkboxLabel} htmlFor={name}>
        {label}
      </label>
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  )
}

export default Checkbox
