import React from 'react';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import UserBody from './UserBody';

const UserHome = () => {
  return (
    <div>
      <UserHeader />
      <div className="flex">
        <UserSidebar />
        <UserBody />
      </div>
    </div>
  );
};

export default UserHome;
