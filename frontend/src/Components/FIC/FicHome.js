import React from 'react'
import FICHeader from './FICHeader'
import FICBody from './FICBody'
import FICSidebar from './FICSidebar'

const FicHome = () => {
  return (
    <div>
      <FICHeader />
      <div className="pt-16 h-[100vh] flex">
        <FICSidebar className="fixed" />
        <div className="p-4 flex-grow overflow-y-auto">
          <FICBody />
        </div>
      </div>
    </div>
    
  )
}

export default FicHome
