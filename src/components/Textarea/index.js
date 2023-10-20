import React from 'react'

import styles from './Textarea.module.scss'

const Textarea = ({ label, type, name, register, error, rules, children, placeholder }) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}</label>
      <textarea placeholder={placeholder} className={styles.input} type={type} name={name} {...register(name, rules)}>
        {children}
      </textarea>
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  )
}

export default Textarea
