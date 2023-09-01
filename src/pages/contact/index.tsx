import SwrTable from '@/components/common/SwrTable';
import { API_ROUTES } from '@/utils/constants';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

const Contact = () => {
    const TABLE_HEADERS = ['Name', 'Status', 'Species', 'Gender'];

    const router = useRouter();

    const CharacterRow = ({ value }: TableRowProps<Character>) => {
        return (
            <tr
                className="border-b bg-gray-800 border-gray-700"
                onClick={() => router.push('/contact/' + value.id)}>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    {value.name}
                </th>
                <td className="px-6 py-4">{value.status}</td>
                <td className="px-6 py-4">{value.species}</td>
                <td className="px-6 py-4">{value.gender}</td>
            </tr>
        );
    };

    return (
        <main
            className={`flex min-h-screen flex-col p-8 max-w-[1024px] mx-auto ${inter.className}`}>
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
            <SwrTable<Character>
                url={API_ROUTES.CHARACTERS}
                tableHeaders={TABLE_HEADERS}
                RowComponent={CharacterRow}
                searchable
                pagination
            />
        </main>
    );
};

export default Contact;
