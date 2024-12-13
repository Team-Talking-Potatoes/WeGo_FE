import FormHeader from '@/components/common/formheader/FormHeader';
import SettingList from '@/components/user/userSetting/settingList/SettingList';

const UserSetting = () => {
  return (
    <div>
      <FormHeader title="설정" isConfigButton />
      <SettingList />
    </div>
  );
};

export default UserSetting;
