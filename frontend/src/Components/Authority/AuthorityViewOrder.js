import React from 'react'
import AuthoritySidebar from './AuthoritySidebar'
import OrderDetails from './OrderDetails'
import AuthorityHeader from './AuthorityHeader'

const AuthorityViewOrder = () => {
    return (
        <div>
          <AuthorityHeader />
          <div className="pt-16 h-[100vh] flex">
            <AuthoritySidebar className="fixed" />
            <div className="p-4 flex-grow overflow-y-auto">
             <OrderDetails/>
            </div>
          </div>
        </div>
      )
}

export default AuthorityViewOrder
