import Header from '@/components/common/header/Header';
import EditForm from '@/components/user/editProfile/EditForm';

const EditProfile = () => {
  return (
    <div>
      <Header title="프로필 수정" isConfigButton />
      <EditForm />
    </div>
  );
};

export default EditProfile;
