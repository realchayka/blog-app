import React from 'react'
import { Pagination } from 'antd'

const PaginationComponent = ({ pages, handlePageChange, currentPage }) => {
  const totalPages = pages ? pages : 1
  return (
    <Pagination
      style={{ marginTop: '26px', marginBottom: '17px', display: 'flex', justifyContent: 'center' }}
      total={totalPages}
      current={currentPage}
      onChange={handlePageChange}
    />
  )
}

export default PaginationComponent
