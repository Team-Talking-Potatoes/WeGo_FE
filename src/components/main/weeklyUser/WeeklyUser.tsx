'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { UserList } from '@/@types/user';
import Link from 'next/link';
import ButtonRounded from '@/components/common/button/ButtonRounded';
import UserCard from '../../card/user/UserCard';
import WeeklyUserHeader from './WeeklyUserHeader';

const WeeklyUser = ({ userList }: { userList: UserList[] }) => {
  if (userList.length === 0) {
    return (
      <section className="mx-auto h-auto max-w-[1480px] px-5 pb-32 pt-12 sm:mb-14 md:px-10">
        <WeeklyUserHeader />
        <div className="heading-1-sb flex h-80 w-full flex-col items-center justify-center gap-5 text-center">
          아직 여행지기들이 없어요.
          <br />
          여행모임을 만들고 다양한 여행지기들과 함께해 볼까요?
          <Link href="/travel">
            <ButtonRounded label="여행모임 만들기" />
          </Link>
        </div>
      </section>
    );
  }
  return (
    <section className="m-auto max-w-[1480px] px-5 pb-32 pt-12 md:px-10">
      <WeeklyUserHeader />
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
