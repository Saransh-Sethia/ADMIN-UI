
import React,{useState, useEffect} from 'react';

import { FaAngleDoubleLeft } from 'react-icons/fa';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';
import './Pagination.css';


const Pagination = ({
  usersPerPage, 
  totalUsers, 
  paginate, 
  prevPage, 
  nextPage, 
  selectedPage
 }) => {
  const pageNumbers = [];

  for (let i=1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination-nav">
      <ul className="pagination">
        <li>
          <div className="icons" onClick={() => paginate(1)}>
            <FaAngleDoubleLeft />
          </div>
        </li>

        <li>
          <div className="icons" onClick={() => prevPage()}>
            <FaAngleLeft />
          </div>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page">
            <div
             onClick={() => paginate(number)}
             className={selectedPage === number ? "selectedPage" : "pageLink"}
             >
            {number}
            </div>
          </li>
        ))}

        <li>
          <div className="icons" onClick={() => nextPage(pageNumbers.length)}>
            <FaAngleRight />
          </div>
        </li>

        <li>
          <div className="icons" onClick={() => paginate(pageNumbers.length)}>
            <FaAngleDoubleRight />
          </div>
        </li>

      </ul>
    </nav>
  )
}

export default Pagination