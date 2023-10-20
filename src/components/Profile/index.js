import React from 'react'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'

import InputField from '../InputField'
import { fetchUpdateUser } from '../../redux/user/userActions'

import styles from './Profile.module.scss'

const Profile = () => {
  const dispatch = useDispatch()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    dispatch(fetchUpdateUser(data.email, data.username, data.password, data.url))
  }

  return (
    <div className={classNames('container', styles.main)}>
      <h2 className={styles.title}>Edit Profile</h2>
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
          label="New password"
          type="password"
          name="password"
          register={register}
          error={errors.password}
        />
        <InputField
          rules={{
            required: 'Field is required',
            pattern: {
              value: /^https?:\/\/\S+$/i,
              message: 'Required is valid url',
            },
          }}
          label="Avatar image (url)"
          type="text"
          name="url"
          register={register}
          error={errors.url}
        />
        <Button htmlType="submit" className={styles.button} type="primary">
          Save
        </Button>
      </form>
    </div>
  )
}

export default Profile
