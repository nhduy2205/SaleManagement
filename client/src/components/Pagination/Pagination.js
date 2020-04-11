import React from 'react'
import PropTypes from 'prop-types'

function Pagination(props) {
    const {pagination, onPageChange} = props
    const {pageSize, pageNo, totalRows} = pagination
    const totalPage = Math.ceil(totalRows/pageSize)
    function handlePageChange(newPage){
        if(onPageChange){
            onPageChange(newPage)
        }
    }
    return (
        <div>
            <button className="btn btn-primary mr-1 px-3" href="#" aria-label="Previous"
                disabled={pageNo <= 1}
                onClick={() => handlePageChange(pageNo - 1)}
            >
            <i className="fa fa-angle-double-left" aria-hidden="true"></i>
            </button>
            <button className="btn btn-primary ml-1 px-3 " href="#" aria-label="Next"
                disabled={pageNo >= totalPage }
                onClick={() => handlePageChange(pageNo + 1)}
            >
            <i className="fa fa-angle-double-right" aria-hidden="true"></i>
            </button>
            
        </div>
    )
}
Pagination.defaultProps = {
    onPageChange: null
}
Pagination.propTypes = {
    // pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Pagination

