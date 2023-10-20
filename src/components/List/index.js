/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import Spin from '../Spin'
import { fetchArticles } from '../../redux/articles/articlesActions'
import ListItem from '../ListItem'
import PaginationComponent from '../Pagination'

import styles from './List.module.scss'

const List = ({articlesData, articlesData: {data: {articles, articlesCount}}, fetchArticles }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const {loading, error} = articlesData
  let pages = Math.ceil(articlesCount / 5)


  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    fetchArticles(currentPage)
  }, [currentPage])
  if(loading) {
    return  <div className={styles.spin}>
      <Spin />
    </div>
  }
  if(error) {
    return <h2>Произошла ошибка...</h2>
  }
  return (
    <div className={classNames(styles.list, 'container')}>
      {articles && articles.map((article, index) => {
        return <ListItem key={index} {...article} />
      })}
      <PaginationComponent handlePageChange={handlePageChange} currentPage={currentPage} pages={pages}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  articlesData: state.articles,
})
const mapDispatchToProps = {
  fetchArticles,
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
