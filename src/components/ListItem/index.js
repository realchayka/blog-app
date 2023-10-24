import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'

import { heartIcon, heartIconLiked } from '../../assets/icons'

import styles from './ListItem.module.scss'
const ListItem = ({ favoritesCount, body, createdAt, title, tagList, author, slug, favorited }) => {
  const { username, image } = author
  const formattedDate = format(new Date(createdAt), 'MMMM dd yyyy')
  return (
    <div className={styles.listItem}>
      <Link to={`/articles/${slug}`}>
        <h2 className={styles.title}>
          {title}
          <div className={styles.span}>
            <img className={styles.heartIcon} src={favorited ? heartIconLiked : heartIcon} />
            <span className={styles.likeCount}>{favoritesCount}</span>
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
        {body && <Markdown className={styles.text}>{body}</Markdown>}

        <div className={styles.person}>
          <div className={styles.personDescription}>
            <h3 className={styles.personTitle}>{username}</h3>
            <p className={styles.personDate}>{formattedDate} </p>
          </div>
          <img className={styles.personImage} src={image} />
        </div>
      </Link>
    </div>
  )
}

export default ListItem
