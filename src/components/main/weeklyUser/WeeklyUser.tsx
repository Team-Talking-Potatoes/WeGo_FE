'use client';

import { useQuery } from '@tanstack/react-query';
import { getPopularUser } from '@/api/user/userList';
import { QUERY_KEYS } from '@/constants/querykeys';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import UserCard from '../../card/UserCard';

const WeeklyUser = () => {
  const queryKey = QUERY_KEYS.USER.POPULAR_USER;
  const {
    data: userList,
    isFetching,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: getPopularUser,
  });

  const currentMonth = new Date().getMonth() + 1;

  if (error && !isFetching) {
    console.error('에러', { error });
    return (
      <div>
        데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <section className="px-5 pb-32 pt-12 md:px-10">
      <h2 className="title-3-eb text-label-normal">
        {currentMonth}월의 여행지기
      </h2>

      <p className="body-2-m pb-6 pt-1 text-label-alternative">
        이번 달 리뷰가 많은 여행지기들을 소개해 드려요!
      </p>

      <main className="flex justify-center gap-4">
        {isLoading && <div>로딩중 WeeklyUser</div>}
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          grabCursor
          style={{ width: '100%', height: 'auto' }}
          breakpoints={{
            768: {
              spaceBetween: 24,
            },
          }}
        >
          {userList &&
            userList.map((user) => (
              <SwiperSlide
                key={user.userId}
                style={{ width: 'auto', height: 'auto' }}
              >
                <UserCard
                  nickname={user.nickname}
                  profileImage={user.profileImage}
                  openTravelCount={user.openTravelCount}
                  reviewCount={user.reviewCount}
                  hashTags={user.hashTags}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </main>
    </section>
  );
};
export default WeeklyUser;
