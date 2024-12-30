import React from 'react'
import UserHeader from './UserHeader'
import UserSidebar from './UserSidebar'
import UserReports from './UserReports'

const Reports = () => {
  return (
    <div>
      <UserHeader />
      <div className="pt-16 h-[100vh] flex">
        <UserSidebar />
        <div className="px-4 w-[90vw] h-full overflow-y-auto w-[88%]">
          {/* Set the height and enable vertical scrolling */}
          <UserReports />
        </div>
      </div>
    </div>
  )
}

export default Reports
