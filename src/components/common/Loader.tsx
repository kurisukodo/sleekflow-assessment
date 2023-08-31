import LoadingIcon from '@/components/icons/LoadingIcon';

const Loader = () => (
    <div className="absolute top-0 bottom-0 left-0 right-0">
        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
            <LoadingIcon />
        </div>
    </div>
);

export default Loader;
