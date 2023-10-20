import React from 'react'
import classNames from 'classnames'

import styles from './InputField.module.scss'

const InputField = ({ label, type, name, register, error, rules, nameClass = undefined, placeholder }) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}</label>
      <input
        placeholder={placeholder}
        className={classNames(styles.input, nameClass)}
        type={type}
        name={name}
        {...register(name, rules)}
      />
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  )
}

export default InputField
