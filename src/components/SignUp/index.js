import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import Checkbox from '../Checkbox'
import InputField from '../InputField'
import { fetchRegister } from '../../redux/user/userActions'

import styles from './SignUp.module.scss'

const SignUp = () => {
  const history = useHistory()
  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const state = useSelector((state) => state.user)

  const { error, isAuth } = state
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch(fetchRegister(data.username, data.email, data.password))
  }
  useEffect(() => {
    if (isAuth) {
      history.push('/articles')
    }
  }, [isAuth])

  return (
    <div className={classNames('container', styles.main)}>
      <h2 className={styles.title}>Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          rules={{
            required: 'Field is required',
            minLength: {
              value: 3,
              message: 'Minimal 3 chars required',
            },
            maxLength: {
              value: 20,
              message: 'Max 20 chars required',
            },
          }}
          label="Username"
          type="text"
          name="username"
          register={register}
          error={errors.username}
          placeholder={'Username'}
        />
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
            minLength: {
              value: 6,
              message: 'Minimal 6 chars required',
            },
            maxLength: {
              value: 40,
              message: 'Max 40 chars required',
            },
          }}
          label="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password}
          placeholder={'Password'}
        />
        <InputField
          rules={{
            required: 'Field is required',
            validate: (value) => {
              if (watch('password') != value) {
                return 'Your passwords do not match'
              }
            },
          }}
          label="Repeat password"
          type="password"
          name="repeat_password"
          register={register}
          error={errors.repeat_password}
          placeholder={'Repeat password'}
        />
        <Checkbox
          label="I agree to the processing of my personal information"
          name="agree"
          rules={{ required: 'You need accept rules' }}
          register={register}
          error={errors.agree}
        />
        {error && (
          <p className={classNames(styles.errorMessage, styles.errorMessageAccount)}>This account already register!</p>
        )}
        <Button htmlType="submit" className={styles.button} type="primary">
          Create
        </Button>
        <p className={styles.logIn}>
          Already have an account?{' '}
          <Link className={styles.link} to="/sign-in">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp
