import Header from '@/components/common/header/Header';
import DeleteForm from '@/components/auth/form/DeleteForm';
import { Suspense } from 'react';

const DeleteAccountPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Header title="계정 탈퇴" isConfigButton />

        <div className="mx-5 mt-[100px] flex justify-center">
          <DeleteForm />
        </div>
      </div>
    </Suspense>
  );
};

export default DeleteAccountPage;
