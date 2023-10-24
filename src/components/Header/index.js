import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { peopleIconPng } from '../../assets/icons'
import { logoutHandler } from '../../redux/user/userActions'

import styles from './Header.module.scss'

const Header = () => {
  const dispatch = useDispatch()
  let user = useSelector((state) => state.user.user)
  let isAuth = useSelector((state) => {
    if (state.user) {
      return state.user.isAuth
    }
    return null
  })

  const handleLinkClick = () => {
    localStorage.setItem('currentPage', 1)
    window.location.reload()
  }

  const handleLogout = () => {
    dispatch(logoutHandler())
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <header className={styles.header}>
      <Link onClick={handleLinkClick} to="/" className={styles.headerLeft}>
        <h2 className={styles.headerTitle}>Realworld Blog</h2>
      </Link>
      <div className={styles.headerRight}>
        {isAuth ? (
          <>
            <Link className={styles.linkIn} to="/new-article">
              Create article
            </Link>
            <Link className={styles.user} to="/profile">
              <h2 className={styles.userTitle}>{user.username}</h2>
              <img className={styles.userImage} src={user.image ? user.image : peopleIconPng} />
            </Link>
            <Link onClick={handleLogout} to="/articles" className={styles.logout}>
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link to="/sign-in" className={styles.link}>
              Sign In
            </Link>
            <Link to="/sign-up" className={styles.linkIn}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
