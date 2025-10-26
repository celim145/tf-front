import { FC } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {/* Previous button */}
                <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        Anterior
                    </button>
                </li>

                {/* Current page indicator */}
                <li className="page-item active">
                    <span className="page-link">
                        {currentPage} de {totalPages}
                    </span>
                </li>

                {/* Next button */}
                <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                    >
                        Próxima
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;