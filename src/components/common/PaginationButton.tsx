const PaginationButton = ({ type, isDisabled, icon, onClick }: PaginationButtonProps) => {
    const roundedBorder = type === 'prev' ? 'rounded-l-lg' : 'rounded-r-lg';

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 ${roundedBorder} border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white disabled:cursor-not-allowed`}>
            {icon}
        </button>
    );
};

export default PaginationButton;
