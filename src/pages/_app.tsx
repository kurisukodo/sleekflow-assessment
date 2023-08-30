import '@/styles/globals.css';
import fetcher from '@/utils/fetcher';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig value={{ fetcher: fetcher, shouldRetryOnError: false }}>
            <Component {...pageProps} />
        </SWRConfig>
    );
}
