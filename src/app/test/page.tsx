import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Posts from './Post';

export const fetchPosts = async (pageNum = 1) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`,
  );
  return response.json();
};

const page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
  });

  /* HydrationBoundary 는 client component이다.
      hydration은 이곳에서 실행이 된다. */
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1>서버 사이드 렌더링 테스트</h1>
      <div>----------------------</div>
      <Posts />
    </HydrationBoundary>
  );
};

export default page;
