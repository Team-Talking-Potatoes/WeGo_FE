import HeroSection from '@/components/main/HeroSection';
import WeeklyPopularContainer from '@/components/main/weeklyTravel/WeeklyPopularContainer';
import WeeklyReviewContainer from '@/components/main/weeklyReview/WeeklyReviewContainer';
// import WeeklyUserContainer from '@/components/main/weeklyUser/WeeklyUserContainer';
import ToTop from '@/components/common/ToTop';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <ToTop />
      <WeeklyPopularContainer />
      <WeeklyReviewContainer />
      {/* <WeeklyUserContainer /> */}
    </main>
  );
};
export default Home;
