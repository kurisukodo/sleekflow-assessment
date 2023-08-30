import Loader from '@/components/common/Loader';
import PaginationButton from '@/components/common/PaginationButton';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import MagnifyingGlassIcon from '@/components/icons/MagnifyingGlassIcon';
import { API_ROUTES } from '@/utils/constants';
import generateQueryString from '@/utils/generateQueryString';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const inter = Inter({ subsets: ['latin'] });

const Contact = () => {
    const MAX_NUM_OF_PAGES = 8;
    const PAGE_STYLES = {
        active: 'text-white bg-gray-700',
        inactive: 'text-gray-400 bg-gray-800 hover:bg-gray-700 hover:text-white',
    };

    const [searchValue, setSearchValue] = useState<string>('');
    const [characters, setCharacters] = useState<any>([]);
    const [availablePages, setAvailablePages] = useState(MAX_NUM_OF_PAGES);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [apiOptions, setApiOptions] = useState({
        page: currentPage,
        name: searchValue,
    });

    const { data, error, isLoading } = useSWR(
        API_ROUTES.CHARACTERS + generateQueryString(apiOptions)
    );

    useEffect(() => {
        if (data) {
            setCharacters(data.results);
            setAvailablePages(Math.min(data.info.pages, MAX_NUM_OF_PAGES));
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            setCharacters([]);
        }
    }, [error]);

    useEffect(() => {
        setApiOptions((prev) => ({
            ...prev,
            page: currentPage,
        }));
    }, [currentPage]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCurrentPage(1);
        setApiOptions({
            page: 1,
            name: searchValue,
        });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageNavigation = (type: string) => {
        setCurrentPage((prev) => (type === 'prev' ? --prev : ++prev));
    };

    const renderCharacters = () =>
        characters.map((character: any) => (
            <tr className="border-b bg-gray-800 border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    {character.name}
                </th>
                <td className="px-6 py-4">{character.status}</td>
                <td className="px-6 py-4">{character.species}</td>
                <td className="px-6 py-4">{character.gender}</td>
            </tr>
        ));

    const renderPages = () =>
        Array.from({ length: availablePages }, (_, i) => ++i).map((page) => (
            <li>
                <button
                    onClick={() => handlePageChange(page)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight cursor-pointer border border-gray-700 ${
                        PAGE_STYLES[page === currentPage ? 'active' : 'inactive']
                    }`}>
                    {page}
                </button>
            </li>
        ));

    return (
        <main className={`flex min-h-screen flex-col p-16 ${inter.className}`}>
            <Head>
                <title>Contact List - SleekFlow</title>
                <meta
                    name="description"
                    content="View our list of contacts with their related information."
                    key="desc"
                />
            </Head>
            <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-white md:text-4xl">
                Contacts
            </h1>
            <form className="mb-5" onSubmit={handleSubmit}>
                <div className="relative w-full lg:w-[30%]">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlassIcon />
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                    <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                        Search
                    </button>
                </div>
            </form>
            <div className="relative overflow-x-auto rounded-lg">
                <table
                    className={`w-full text-sm text-left text-gray-400 ${
                        isLoading ? 'opacity-25' : ''
                    }`}>
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Species
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Gender
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCharacters()}
                        {!isLoading && characters.length === 0 && (
                            <tr className="border-b bg-gray-800 border-gray-700">
                                <th
                                    colSpan={4}
                                    className="px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                                    No available contacts.
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
                {isLoading && <Loader />}
            </div>
            <div className="flex flex-row justify-center mt-5">
                <nav aria-label="Page navigation example">
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
        </main>
    );
};

export default Contact;
