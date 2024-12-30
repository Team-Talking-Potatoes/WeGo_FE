import ArrowLeft from '@/assets/icon/arrow/arrow_left_24px.svg';
import ArrowRight from '@/assets/icon/arrow/arrow_right_24px.svg';
import PaginationButton from './button/PaginationButton';

interface Props {
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({ totalPages, currentPage, paginate }: Props) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="mt-8 flex w-full justify-center xl:mt-14"
      data-testid="mypage-pagination"
    >
      <PaginationButton
        className="mr-4"
        disabled={currentPage === 1}
        onClick={() => paginate(currentPage - 1)}
      >
        <ArrowLeft fill="label-normal" />
      </PaginationButton>

      <ul className="body-2-sb inline-flex gap-4 -space-x-px">
        {pageNumbers.map((number) => (
          <li key={number}>
            <PaginationButton
              className="border-line-neutral text-label-alternative"
              classNameCondition={{
                'border-primary-normal bg-blue-100 text-primary-normal':
                  number === currentPage,
              }}
              onClick={() => paginate(number)}
            >
              {number}
            </PaginationButton>
          </li>
        ))}
      </ul>

      <PaginationButton
        className="ml-4"
        disabled={currentPage === totalPages}
        onClick={() => paginate(currentPage + 1)}
      >
        <ArrowRight fill="label-normal" />
      </PaginationButton>
    </nav>
  );
};

export default Pagination;
