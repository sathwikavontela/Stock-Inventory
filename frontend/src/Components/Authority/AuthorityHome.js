import React from 'react'
import UserHeader from './UserHeader'
import UserSidebar from './UserSidebar'
import UserBody from './UserBody'

const UserHome = () => {
  return (
    <div>
      <UserHeader />
      <div className="pt-16 h-[100vh] flex">
        <UserSidebar className="fixed" />
        <div className="p-4 flex-grow overflow-y-auto">
          <UserBody />
        </div>
      </div>
    </div>
  )
}

export default UserHome;
