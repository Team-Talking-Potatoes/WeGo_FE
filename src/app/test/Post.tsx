'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './page';

const Posts = () => {
  console.log('Posts 컴포넌트');
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
  });

  return (
    <div>
      {data?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
