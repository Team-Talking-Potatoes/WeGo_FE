interface Props {
  skipId: string;
  skipLabel: string;
  currentElement: number;
}

export const ListSkip = {
  /**
   * 리스트 탈출을 위한 링크 컴포넌트
   */
  Link: ({ currentElement, skipId, skipLabel }: Partial<Props>) => {
    const pageInfo = currentElement
      ? ` (현재 ${currentElement} : ''}번째 요소)`
      : '';

    return (
      <li className="col-span-full">
        <a
          href={`#${skipId}`}
          className="sr-only focus:not-sr-only focus:block focus:border focus:bg-white focus:p-2 focus:text-center"
          aria-label={`${skipLabel || '목록'} 탈출하기${pageInfo}`}
        >
          {skipLabel || '목록'} 탈출하기
        </a>
      </li>
    );
  },

  /**
   * 리스트 탈출 후 도착 지점 컴포넌트
   */
  Destination: ({ skipId, skipLabel }: Partial<Props>) => {
    return (
      <div
        id={skipId}
        tabIndex={-1}
        aria-label={`${skipLabel || '목록'} 이후 콘텐츠`}
      />
    );
  },
};
