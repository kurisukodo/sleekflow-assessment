import generateQueryString from '@/utils/generateQueryString';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Pagination from './Pagination';
import SearchInput from './SearchInput';
import Table from './Table';

const SwrTable = <T extends unknown>({
    url,
    tableHeaders,
    RowComponent,
    searchable,
    pagination,
}: SwrTableProps) => {
    const MAX_NUM_OF_PAGES = 8;

    const [tableData, setTableData] = useState<T[]>([]);
    const [availablePages, setAvailablePages] = useState<number>(MAX_NUM_OF_PAGES);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [apiOptions, setApiOptions] = useState<ApiOptions>({
        page: 1,
        name: '',
    });

    const { data, error, isLoading } = useSWR<ApiResponse<T>>(
        url + (pagination ? generateQueryString(apiOptions) : '')
    );

    useEffect(() => {
        if (data) {
            setTableData(Array.isArray(data.results) ? data.results : [data.results]);

            if (pagination && data.info) {
                setAvailablePages(Math.min(data.info.pages, MAX_NUM_OF_PAGES));
            }
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            setTableData([]);
            setAvailablePages(1);
        }
    }, [error]);

    useEffect(() => {
        setApiOptions((prev) => ({
            ...prev,
            page: currentPage,
        }));
    }, [currentPage]);

    const renderData = () =>
        tableData.map((value, index) => <RowComponent value={value} key={'row-' + index} />);

    return (
        <>
            {searchable && <SearchInput onSubmit={setApiOptions} />}
            <Table
                isEmpty={tableData.length === 0}
                tableHeaders={tableHeaders}
                isLoading={isLoading}
                renderData={renderData}
            />
            {pagination && (
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    availablePages={availablePages}
                />
            )}
        </>
    );
};

export default SwrTable;
