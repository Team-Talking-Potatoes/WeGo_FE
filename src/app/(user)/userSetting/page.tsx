import FormTitle from '@/components/common/form/FormTitle';
import Header from '@/components/common/header/Header';
import SettingList from '@/components/user/userSetting/settingList/SettingList';

const UserSetting = () => {
  return (
    <div>
      <Header title="설정" isConfigButton />

      <div className="mx-auto mt-[84px] w-full px-5 xl:mt-[120px]">
        <div className="mx-auto max-w-[688px] xl:-mb-4">
          <FormTitle title="설정" />
        </div>

        <SettingList />
      </div>
    </div>
  );
};

export default UserSetting;
