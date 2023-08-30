type PaginationButtonProps = {
    type: string;
    isDisabled: boolean;
    icon: React.JSX.Element;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
    type,
    isDisabled,
    icon,
    onClick,
}): React.JSX.Element => {
    const roundedBorder = `rounded-${type === 'prev' ? 'l' : 'r'}-lg`;

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`flex items-center justify-center px-4 h-10 leading-tight border bg-gray-800 ${roundedBorder} border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white disabled:cursor-not-allowed`}>
            {icon}
        </button>
    );
};

export default PaginationButton;
