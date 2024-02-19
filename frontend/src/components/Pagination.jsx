/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Pagination = ({ totalEntries, entriesPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalEntries / entriesPerPage);

    return (
        <div className="   mt-4">
            <nav className=''>
                <ul className="pagination flex flex-row justify-center">
                    <li className={`page-item ${currentPage === 1 ? 'hidden' : ''}`}>
                        <button onClick={() => onPageChange(currentPage - 1)} className="page-link bg-gray-200 px-3 py-1 rounded-lg mr-2">
                            Previous
                        </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button onClick={() => onPageChange(index + 1)} className="page-link bg-gray-200 px-3 py-1 rounded-lg mr-2">
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'hidden' : ''}`}>
                        <button onClick={() => onPageChange(currentPage + 1)} className="page-link bg-gray-200 px-3 py-1 rounded-lg mr-2">
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
