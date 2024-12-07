import UserIcon from './UserIcon';

const UserIconList = () => {
  const userList = [
    { id: 1, profileImage: '/test1.png' },
    { id: 2, profileImage: '' },
    { id: 3, profileImage: '/user.jpg' },
    { id: 4, profileImage: '/test4.jpg' },
    { id: 5, profileImage: '' },
    { id: 6, profileImage: '/test4.jpg' },
    { id: 7, profileImage: '/test4.jpg' },
    { id: 8, profileImage: '' },
  ];

  const maxVisible = 4;
  const visibleUsers = userList.slice(0, maxVisible);
  const extraCount = userList.length - maxVisible;

  return (
    <div className="flex items-center space-x-[-12px]">
      {visibleUsers.map((user, index) => (
        <div
          key={user.id}
          className="relative flex-shrink-0"
          style={{
            zIndex: index,
          }}
        >
          <UserIcon size="sm" profileImage={user.profileImage} />
        </div>
      ))}

      {extraCount > 0 && (
        <div className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-300 text-sm font-semibold text-slate-500">
          +{extraCount}
        </div>
      )}
    </div>
  );
};

export default UserIconList;
