/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import InputField from '../InputField'
import { fetchLogin } from '../../redux/user/userActions'

import styles from './SignIn.module.scss'

const SignIn = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const state = useSelector((state) => state.user)
  const { error, isAuth } = state
  const onSubmit = (data) => {
    dispatch(fetchLogin(data.email, data.password))
  }
  useEffect(() => {
    if (isAuth) {
      history.push('/articles')
    }
  }, [isAuth])

  return (
    <div className={classNames('container', styles.main)}>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          rules={{
            required: 'Field is required',
            pattern: {
              value: /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm,
              message: 'Required is valid email address',
            },
          }}
          label="Email address"
          type="text"
          name="email"
          register={register}
          error={errors.email}
          placeholder={'Email'}
        />
        <InputField
          rules={{
            required: 'Field is required',
          }}
          label="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password}
          placeholder={'Password'}
        />
        {error && (
          <p className={classNames(styles.errorMessage, styles.errorMessageAccount)}>Email or password is wrong!</p>
        )}
        <Button htmlType="submit" className={styles.button} type="primary">
          Login
        </Button>
        <p className={styles.logIn}>
          Don't have an account{' '}
          <Link className={styles.link} to="/sign-in">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignIn
