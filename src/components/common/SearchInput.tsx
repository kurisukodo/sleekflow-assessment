import MagnifyingGlassIcon from '@/components/icons/MagnifyingGlassIcon';
import React, { useState } from 'react';

const SearchInput = ({ onSubmit }: SearchInputProps) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({
            page: 1,
            name: searchValue,
        });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return (
        <form className="mb-5" onSubmit={handleSubmit}>
            <div className="relative w-full lg:w-[30%]">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon />
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm border !rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
    );
};

export default SearchInput;
