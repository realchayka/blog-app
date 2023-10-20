import React from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import ArticleForm from '../ArticleForm'
import { editPost } from '../../redux/articles/articlesActions'

import styles from './ArticleEdit.module.scss'

const ArticleEdit = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const history = useHistory()

  const handleFormSubmit = (data) => {
    const { title, description, text, ...rest } = data
    const tagList = Object.values(rest)

    dispatch(editPost(title, description, text, slug, tagList))
    history.push('/')
  }
  return (
    <div className={classNames('container', styles.main)}>
      <h2 className={styles.title}>Edit article</h2>
      <ArticleForm handleFormSubmit={handleFormSubmit} />
    </div>
  )
}

export default ArticleEdit
