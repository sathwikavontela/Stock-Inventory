import React from 'react'
import UserHeader from './UserHeader'
import UserSidebar from './UserSidebar'
import OrdersList from './OrdersList'

const Orders = () => {
  return (
    <div>
      <UserHeader />
      <div className="pt-16 h-[100vh] flex">
        <UserSidebar />
        <div className="px-4 py-4">
          <OrdersList />
        </div>
      </div>
    </div>
  )
}

export default Orders
