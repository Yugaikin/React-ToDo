import React, { useEffect } from "react";
import "../styles/Pagination.css";
import ButtonPagintion from "./ButtonPagination";

const Pagination = ({ amountTask, page, setPage, countPage }) => {
  const countBtn = [...Array(countPage).keys()];
  
   useEffect(() => {
    page >= amountTask / 5 && countPage > 0 && setPage(countPage);
    amountTask===0 && setPage(1)
  }, [amountTask]);

  const lastPage = () => {
    if(page>1){
      setPage(page-1)
    }
  }

  const nextPage = () => {
    if(page<countPage){
      setPage(page + 1)
    }
  }

  return (
    <div className="pagination">
      <ul>
        <li onClick={() => setPage(1)}>В начало</li>
        <li onClick={lastPage}>&laquo;</li>
        {countBtn.map((item) => {
          return (
            <ButtonPagintion
              key={item + 1}
              item={item}
              page={page - 1}
              setPage={setPage}
              number={item + 1}
            />
          );
        })}
        <li onClick={nextPage}>&raquo;</li>
        <li onClick={() => setPage(countPage)}>В конец</li>
      </ul>
    </div>
  );
};

export default Pagination;