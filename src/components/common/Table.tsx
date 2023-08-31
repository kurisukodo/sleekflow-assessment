import Loader from '@/components/common/Loader';
import React from 'react';

const Table = ({ isEmpty, isLoading, tableHeaders, renderData }: TableProps) => {
    const renderHeaders = () =>
        tableHeaders.map((value: string, index: number) => (
            <th key={'header-' + index} scope="col" className="px-6 py-3">
                {value}
            </th>
        ));

    return (
        <div className="relative overflow-x-auto rounded-lg">
            <table
                className={`w-full text-sm text-left text-gray-400 ${
                    isLoading ? 'opacity-25' : ''
                }`}>
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>{renderHeaders()}</tr>
                </thead>
                <tbody>
                    {renderData()}
                    {!isLoading && isEmpty && (
                        <tr className="border-b bg-gray-800 border-gray-700">
                            <th
                                colSpan={4}
                                className="px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                                No available rows.
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>
            {isLoading && <Loader />}
        </div>
    );
};

export default Table;
