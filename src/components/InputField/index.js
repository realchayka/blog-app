import React from 'react'
import classNames from 'classnames'

import styles from './InputField.module.scss'

const InputField = ({ label, type, name, register, error, rules, nameClass = undefined, placeholder }) => {
  const validateInput = (value) => {
    if (value.trim() === '') {
      return 'Field cannot be empty or contain only spaces'
    }
    return true
  }
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}</label>
      <input
        placeholder={placeholder}
        className={classNames(styles.input, nameClass)}
        type={type}
        name={name}
        {...register(name, { ...rules, validate: validateInput })}
      />
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  )
}

export default InputField
