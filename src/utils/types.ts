type ApiOptions = {
    page: number;
    name: string;
};

type ApiResponseInfo = {
    pages: number;
    count: number;
};

type ApiResponse<T> = {
    info?: ApiResponseInfo;
    results: T;
};

type CharacterLocation = {
    name: string;
};

type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: CharacterLocation;
    location: CharacterLocation;
    image: string;
    episode: string[];
};

type Episode = {
    name: string;
    air_date: string;
    episode: string;
};

type TableRowProps<T> = {
    value: T;
};

type SwrTableProps = {
    url?: string;
    tableHeaders: string[];
    RowComponent: React.ElementType;
    searchable?: boolean;
    pagination?: boolean;
};

type TableProps = {
    isEmpty: boolean;
    isLoading: boolean;
    tableHeaders: string[];
    renderData: () => React.ReactElement[];
};

type SearchInputProps = {
    onSubmit: React.Dispatch<React.SetStateAction<ApiOptions>>;
};

type PaginationProps = {
    currentPage: number;
    availablePages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

type PaginationButtonProps = {
    type: string;
    isDisabled: boolean;
    icon: React.JSX.Element;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type ChevronLeftIconProps = {
    className?: string;
};

type PersonalInfoItem = {
    title: string;
    value: string;
};
