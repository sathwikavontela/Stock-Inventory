import React from 'react'
import AuthorityHeader from './AuthorityHeader';
import AuthoritySidebar from './AuthoritySidebar';
import AuthorityBody from './AuthorityBody';

const UserHome = () => {
  return (
    <div>
      <AuthorityHeader />
      <div className="pt-16 h-[100vh] flex">
        <AuthoritySidebar className="fixed" />
        <div className="p-4 flex-grow overflow-y-auto">
          <AuthorityBody />
        </div>
      </div>
    </div>
  )
}

export default UserHome;
