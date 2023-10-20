import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'antd'

import InputField from '../InputField'
import Textarea from '../Textarea'

import styles from './ArticleForm.module.scss'

const ArticleForm = ({ handleFormSubmit }) => {
  const [tags, setTags] = useState([])

  const handleDeleteTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index)
    setTags(updatedTags)
  }

  const addNewTag = () => {
    setTags([...tags, ''])
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    handleFormSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        rules={{
          required: 'Field is required',
        }}
        label="Title"
        type="text"
        name="title"
        register={register}
        error={errors.title}
        nameClass={styles.bigWidth}
        placeholder={'Title'}
      />
      <InputField
        rules={{
          required: 'Field is required',
        }}
        label="Short description"
        type="text"
        name="description"
        register={register}
        error={errors.description}
        nameClass={styles.bigWidth}
        placeholder={'Short description'}
      />
      <Textarea placeholder={'Text'} label="Text" name="text" register={register} error={errors.password}></Textarea>
      <div className={styles.tagGroup}>
        <InputField
          rules={{
            required: 'Field is required',
          }}
          label="Tags"
          type="textarea"
          name="tag"
          register={register}
          error={errors.password}
          placeholder={'Tag'}
        />
        <Button htmlType="button" className={styles.buttonDanger} danger>
          Delete
        </Button>
        {tags.length === 0 && (
          <Button
            htmlType="button"
            className={styles.buttonOutline}
            onClick={(e) => {
              e.preventDefault()
              addNewTag()
            }}
          >
            Add tag
          </Button>
        )}
      </div>
      {tags &&
        tags.map((tag, index) => (
          <div className={styles.tagGroup} key={index}>
            <InputField
              rules={{
                required: 'Field is required',
              }}
              type="text"
              name={`tag${index}`}
              register={register}
              error={errors[`tag${index}`]}
              placeholder={'Tag'}
            />
            <Button type="button" className={styles.buttonDanger} danger onClick={() => handleDeleteTag(index)}>
              Delete
            </Button>
            {index === tags.length - 1 && (
              <Button
                type="button"
                className={styles.buttonOutline}
                onClick={(e) => {
                  e.preventDefault()
                  addNewTag()
                }}
              >
                Add tag
              </Button>
            )}
          </div>
        ))}

      <Button htmlType="submit" className={styles.button} type="primary">
        Send
      </Button>
    </form>
  )
}

export default ArticleForm
