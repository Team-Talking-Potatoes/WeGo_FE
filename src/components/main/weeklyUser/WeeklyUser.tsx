'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { UserList } from '@/@types/user';
import UserCard from '../../card/user/UserCard';

const WeeklyUser = ({ userList }: { userList: UserList[] }) => {
  const currentMonth = new Date().getMonth() + 1;

  return (
    <section className="m-auto max-w-[1480px] px-5 pb-32 pt-12 md:px-10">
      <h2 className="title-3-eb text-label-normal">
        {currentMonth}월의 여행지기
      </h2>

      <p className="body-2-m pb-6 pt-1 text-label-alternative">
        이번 달 리뷰가 많은 여행지기들을 소개해 드려요!
      </p>

      <main
        className="flex justify-center gap-4"
        aria-label="이미지 가로 슬라이드"
      >
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
                  userId={user.userId}
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
