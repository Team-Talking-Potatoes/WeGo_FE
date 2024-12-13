import FormHeader from '@/components/common/formheader/FormHeader';
import ProfileSection from '@/components/mypage/profile/ProfileSection';
import TabSection from '@/components/mypage/tab/TabSection';

const MyPage = () => {
  return (
    <div>
      <FormHeader title="마이페이지" isConfigButton />

      <main>
        <ProfileSection />
        <TabSection />
      </main>
    </div>
  );
};

export default MyPage;
