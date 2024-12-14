import Link from 'next/link';

function page() {
  return (
    <div>
      <h1>모달 테스트</h1>
      <Link href="/review/new">클릭</Link>
    </div>
  );
}

export default page;
