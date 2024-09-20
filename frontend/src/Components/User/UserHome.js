import React from 'react'
import UserHeader from './UserHeader'
import UserSidebar from './UserSidebar'
import UserBody from './UserBody'

const UserHome = () => {
  return (
    <div>
      <UserHeader />
      <div className="pt-16 h-[100vh] flex">
        <UserSidebar />
        <div className="p-4"> </div>
      </div>
    </div>
  )
}

export default UserHome
