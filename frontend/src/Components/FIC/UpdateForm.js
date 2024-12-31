import React from 'react'
import FICHeader from './FICHeader'
import FICSidebar from './FICSidebar'
import ProductUpdateForm from './ProductUpdateForm'

const UpdateForm = () => {
    return (
        <div>
          <FICHeader />
          <div className="pt-16 h-[100vh] flex">
            <FICSidebar className="fixed" />
            <div className="p-4 flex-grow overflow-y-hidden">
              <ProductUpdateForm />
            </div>
          </div>
        </div>
      )
}

export default UpdateForm
