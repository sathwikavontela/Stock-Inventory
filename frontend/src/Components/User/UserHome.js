import React from 'react';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import UserBody from './UserBody'; // Import UserBody

const UserHome = () => {
  return (
    <div>
      <UserHeader />
      <div className="pt-16 h-[100vh] flex">
        <UserSidebar />
        <div className="p-4 flex-grow"> {/* Added flex-grow to take full width */}
          <UserBody /> {/* Render UserBody here */}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
