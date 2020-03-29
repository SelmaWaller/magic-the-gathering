import React from 'react';
import ReactLoading from 'react-loading';

const Pagination = ({
  prevDisabled,
  prevClassName,
  toPrev,
  currentPage,
  lastPage,
  nextDisabled,
  nextClassName,
  toNext,
}) => {
  return (
    <>
      <div className="pagination">
        <div>
          <button
            disabled={prevDisabled}
            className={prevClassName}
            onClick={toPrev}
          >
            <span>&#3894;</span>Prev
          </button>
        </div>
        <button className="currentPage">
          {currentPage} of{' '}
          {lastPage ? (
            lastPage
          ) : (
            <span className="maxPageLoading">
              {' '}
              <ReactLoading
                type={'spinningBubbles'}
                color={'#5494bea1'}
                height={15}
                width={15}
              />
            </span>
          )}
        </button>
        <div>
          <button
            disabled={nextDisabled}
            className={nextClassName}
            onClick={toNext}
          >
            Next <span>&#3894;</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
