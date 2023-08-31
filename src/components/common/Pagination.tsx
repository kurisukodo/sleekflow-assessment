import PaginationButton from '@/components/common/PaginationButton';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import React from 'react';

const Pagination = ({ currentPage, availablePages, setCurrentPage }: PaginationProps) => {
    const PAGE_STYLES = {
        active: 'text-white bg-gray-700',
        inactive: 'text-gray-400 bg-gray-800 hover:bg-gray-700 hover:text-white',
    };

    const handlePageNavigation = (type: string) => {
        setCurrentPage((prev) => (type === 'prev' ? --prev : ++prev));
    };

    const renderPages = () =>
        Array.from({ length: availablePages }, (_, i) => ++i).map((page) => (
            <li key={'page-' + page}>
                <button
                    onClick={() => setCurrentPage(page)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight cursor-pointer border border-gray-700 ${
                        PAGE_STYLES[page === currentPage ? 'active' : 'inactive']
                    }`}>
                    {page}
                </button>
            </li>
        ));

    return (
        <div className="flex flex-row justify-center mt-5">
            <nav>
                <ul className="flex items-center -space-x-px h-10 text-base">
                    <li>
                        <PaginationButton
                            onClick={() => handlePageNavigation('prev')}
                            isDisabled={currentPage === 1}
                            icon={<ChevronLeftIcon />}
                            type="prev"
                        />
                    </li>
                    {renderPages()}
                    <li>
                        <PaginationButton
                            onClick={() => handlePageNavigation('next')}
                            isDisabled={currentPage === availablePages}
                            icon={<ChevronRightIcon />}
                            type="next"
                        />
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
