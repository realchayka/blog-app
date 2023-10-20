import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import Markdown from 'markdown-to-jsx'
import { Button, Popconfirm } from 'antd'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { QuestionCircleOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { format } from 'date-fns'

import { heartIcon, heartIconLiked } from '../../assets/icons'
import { deletePost, fetchOneArticle } from '../../redux/articles/articlesActions'
import Spin from '../Spin'
import BlogService from '../../services/blog-service'

import styles from './ListItemFull.module.scss'

const ListItemFull = ({ fetchOneArticle, article, match }) => {
  const service = new BlogService()
  const auth = useSelector((state) => state.user.isAuth)
  const name = useSelector((state) => state.user.user?.username)
  const dispatch = useDispatch()
  const history = useHistory()
  const { params } = match
  const { slug } = params

  useEffect(() => {
    fetchOneArticle(slug)
  }, [slug])

  const { title, tagList, body, author, favoritesCount, createdAt, favorited } = article?.article || {}
  const likesStart = favoritesCount || 0
  const favoritesStart = favorited || false
  const [favorite, setFavorited] = useState(favoritesStart)
  const [likesCount, setLikesCount] = useState(likesStart)

  const { username, image } = author || {}
  const formattedDate = createdAt ? format(new Date(createdAt), 'MMMM dd yyyy') : ''

  const handleDeleteConfirm = () => {
    try {
      dispatch(deletePost(slug))
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteCancel = () => {
    console.log('cancel')
  }

  const handleClickLike = async () => {
    try {
      if (favorite) {
        let likes = await service.likePost(slug)

        setFavorited(likes.data.article.favorited)
        setLikesCount(likes.data.article.favoritesCount - 1)
      } else {
        let likes = await service.unLikedPost(slug)

        setFavorited(likes.data.article.favorited)
        setLikesCount(likes.data.article.favoritesCount + 1)
      }
      setFavorited(!favorite)
    } catch (error) {
      console.log(error)
    }
  }

  if (!article) {
    return <Spin />
  }

  return (
    <div className={classNames('container', styles.listItem)}>
      <h2 className={styles.title}>
        {title}
        <div className={styles.span}>
          <img onClick={handleClickLike} className={styles.heartIcon} src={favorite ? heartIconLiked : heartIcon} />
          <span className={styles.likeCount}>{likesCount}</span>
        </div>
      </h2>
      <div className={styles.tagList}>
        {tagList &&
          tagList.map((tag, index) => (
            <div key={index} className={styles.tag}>
              {tag}
            </div>
          ))}
      </div>
      <Markdown className={styles.text}>{body}</Markdown>
      <div className={styles.person}>
        <div className={styles.personDescription}>
          <h3 className={styles.personTitle}>{username}</h3>
          <p className={styles.personDate}>{formattedDate} </p>
        </div>
        <img className={styles.personImage} src={image} />
        {auth && name === username && (
          <div className={styles.editGroup}>
            <Popconfirm
              className={styles.delete}
              title="Delete the post"
              description="Are you sure to delete this post?"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: 'red',
                  }}
                />
              }
              onConfirm={handleDeleteConfirm}
              onCancel={handleDeleteCancel}
            >
              <Button danger>Delete</Button>
            </Popconfirm>

            <Link to={`/articles/${slug}/edit`} className={styles.edit}>
              Edit
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  article: state.articles.article,
})

const mapDispatchToProps = {
  fetchOneArticle,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListItemFull))
