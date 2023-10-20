import React from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import ArticleForm from '../ArticleForm'
import { createPost } from '../../redux/articles/articlesActions'

import styles from './NewArticle.module.scss'

const NewArticle = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const handleFormSubmit = (data) => {
    const { title, description, text, ...rest } = data
    const tagList = Object.values(rest)
    dispatch(createPost(title, description, text, tagList))
    history.push('/')
    window.location.reload()
  }
  return (
    <div className={classNames('container', styles.main)}>
      <h2 className={styles.title}>Create new article</h2>
      <ArticleForm handleFormSubmit={handleFormSubmit} />
    </div>
  )
}

export default NewArticle
