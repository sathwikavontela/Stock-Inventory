import React from 'react'
import AuthorityHeader from './AuthorityHeader'
import AuthoritySidebar from './AuthoritySidebar'
import AuthorityOrderList from './AuthorityOrderList'

const AuthorityOrder = () => {
  return (
    <div>
      <AuthorityHeader />
      <div className="pt-16 h-[100vh] flex">
        <AuthoritySidebar />
        <div className="px-4 w-[90vw] h-full overflow-y-auto">
          {/* Set the height and enable vertical scrolling */}
          <AuthorityOrderList />
        </div>
      </div>
    </div>
  )
}

export default AuthorityOrder
