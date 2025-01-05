import Header from '@/components/common/header/Header';
import ProfileSection from '@/components/mypage/profile/ProfileSection';
import TabSection from '@/components/mypage/tab/TabSection';

const MyPage = async () => {
  return (
    <div>
      <Header title="마이페이지" isConfigButton />

      <main className="mx-5 mt-[72px] xl:mx-10 xl:mt-[140px]">
        <ProfileSection />
        <TabSection />
      </main>
    </div>
  );
};

export default MyPage;
