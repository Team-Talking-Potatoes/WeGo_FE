import HeroSection from '@/components/main/HeroSection';
// import WeeklyPopularContainer from '@/components/main/weeklyTravel/WeeklyPopularContainer';
import WeeklyReviewContainer from '@/components/main/weeklyReview/WeeklyReviewContainer';
// import WeeklyUserContainer from '@/components/main/weeklyUser/WeeklyUserContainer';
import ToTop from '@/components/common/ToTop';
// import SkeletonHomeTravel from '@/components/common/skeleton/home/SkeletonHomeTravel';
import { Suspense } from 'react';
import SkeletonWeeklyReview from '@/components/common/skeleton/home/SkeletonWeeklyReview';
// import SkeletonWeeklyHeader from '@/components/common/skeleton/home/SkeletonWeeklyHeader';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <ToTop />
      {/* <Suspense fallback={<SkeletonHomeTravel />}>
        <WeeklyPopularContainer />
      </Suspense> */}
      <Suspense fallback={<SkeletonWeeklyReview />}>
        <WeeklyReviewContainer />
      </Suspense>
      {/* <Suspense fallback={<SkeletonWeeklyHeader />}>
        <WeeklyUserContainer />
      </Suspense> */}
    </main>
  );
};
export default Home;
