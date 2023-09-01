import Loader from '@/components/common/Loader';
import SwrTable from '@/components/common/SwrTable';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import { API_ROUTES } from '@/utils/constants';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const inter = Inter({ subsets: ['latin'] });

const IndividualContact = () => {
    const TABLE_HEADERS = ['Name', 'Air Date', 'Episode'];

    const router = useRouter();
    const { id } = router.query;
    const [contact, setContact] = useState<Character>();
    const [episodeIds, setEpisodeIds] = useState<string>();

    const { data, error } = useSWR<ApiResponse<Character>>(
        id ? `${API_ROUTES.CHARACTERS}/${id}` : null
    );

    useEffect(() => {
        if (data) {
            setContact(data.results);
            setEpisodeIds(getEpisodesAsArray(data.results.episode));
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            redirectBack();
        }
    }, [error]);

    const redirectBack = () => {
        router.back();
    };

    const getEpisodesAsArray = (episodes: string[]) => {
        return episodes.map((episode: string) => episode.split('/').pop()).join(',');
    };

    const InfoItem = ({ title, value }: PersonalInfoItem) => (
        <div>
            <p className="text-white font-medium">{title}</p>
            <p className="text-gray-400">{value}</p>
        </div>
    );

    const EpisodeRow = ({ value }: TableRowProps<Episode>) => {
        return (
            <tr className="border-b bg-gray-800 border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    {value.name}
                </th>
                <td className="px-6 py-4 whitespace-nowrap">{value.air_date}</td>
                <td className="px-6 py-4">{value.episode}</td>
            </tr>
        );
    };

    if (!contact) {
        return (
            <div className="min-h-screen relative ">
                <Loader />
            </div>
        );
    }

    return (
        <main className={`flex min-h-screen flex-col ${inter.className}`}>
            <Head>
                <title>{contact?.name} - SleekFlow</title>
                <meta
                    name="description"
                    content={`View information about ${contact?.name}.`}
                    key="desc"
                />
            </Head>
            <div className="p-8 bg-gray-800 border-b border-gray-700">
                <div className="w-full lg:w-[1024px] mx-auto">
                    <button
                        onClick={redirectBack}
                        className="flex flex-row items-center gap-3 mb-5 text-white">
                        <ChevronLeftIcon className="h-7" />{' '}
                        <span className="font-extrabold leading-none tracking-tight text-white">
                            Back
                        </span>
                    </button>
                    <div className="flex flex-col items-center gap-8 md:flex-row">
                        <Image
                            src={contact?.image}
                            alt="Contact image"
                            width={150}
                            height={150}
                            className="rounded-full md:mb-0"
                            priority={true}
                        />
                        <h1 className="text-3xl font-extrabold leading-none tracking-tight text-white md:text-4xl">
                            {contact?.name}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="p-8">
                <div className="w-full mx-auto lg:px-0 lg:w-[1024px]">
                    <h2 className="mb-4 font-extrabold leading-none tracking-tight text-white">
                        Personal Info
                    </h2>
                    <div className="w-full p-6 border rounded-lg shadow bg-gray-800 border-gray-700 grid grid-cols-1 gap-5 md:grid-cols-3">
                        <InfoItem title="Status" value={contact?.status} />
                        <InfoItem title="Gender" value={contact?.gender} />
                        <InfoItem title="Species" value={contact?.species} />
                        <InfoItem title="Location" value={contact?.location.name} />
                        <InfoItem title="Origin" value={contact?.origin.name} />
                    </div>
                    <h2 className="mb-4 mt-8 font-extrabold leading-none tracking-tight text-white">
                        Episodes
                    </h2>
                    <SwrTable<Episode>
                        url={episodeIds ? `${API_ROUTES.EPISODES}/${episodeIds}` : undefined}
                        tableHeaders={TABLE_HEADERS}
                        RowComponent={EpisodeRow}
                    />
                </div>
            </div>
        </main>
    );
};

export default IndividualContact;
