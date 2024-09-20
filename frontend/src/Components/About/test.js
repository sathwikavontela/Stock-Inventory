<div className="bg-blue-50 mt-20 ">
    <Header />
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 z-20">
          <h1 className="text-black text-5xl font-bold  mb-6">
            Inventory Management Software System
          </h1>
          <p className="text-black text-lg mb-6">
            Our inventory management software allows users to efficiently track the exact location and stock levels of your products in real-time.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
            Schedule a Demo
          </button>
        </div>
      </div>

      {/* Background Image Section */}
      <div className="absolute top-0 right-0 z-0">
        <img
          src={HeaderImage}
          alt="Inventory Management"
          className="h-[500px] object-contain"
        />
      </div>

      {/* Gap between Header and About Section */}
      <div className="h-12"></div> {/* This adds space between sections */}

      {/* About Section */}
      <div className="relative container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="md:w-1/2">
          <img src={About2} alt="Dashboard Screenshot" className="w-[400px] h-[250px] shadow-lg mx-auto" />
          </div>
          <div className="md:w-1/2 md:pl-12 mt-30 md:mt-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What Is An Inventory Management System?
            </h2>
            <p className="text-lg text-gray-600 mb-4">
            Inventory management is the process of ensuring that adequate stock levels are maintained to avoid interruptions in a business’s day-to-day operations. Businesses manage their inventory around the clock as they purchase new products and ship orders to customers. It is essential for companies to have a simple, effective inventory management tool to help facilitate and streamline their day-to-day inventory processes. The pillars of a successful inventory management system include the following:
            </p>
            <p className="text-lg text-gray-600">
            <ul className="list-disc pl-6 text-lg text-gray-600 mb-4">
              <li>Inventory levels</li>
              <li>Orders</li>
              <li>Product Identification</li>
            </ul>
            </p>
          </div>
        </div>

        {/* New Section: Stock Inventory Management Details */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Stock Inventory Management
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Our stock inventory management feature is designed to help you maintain the optimal level of stock, avoid shortages, and minimize excess inventory. You can:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-600 mb-4">
              <li>Monitor stock levels in real-time.</li>
              <li>Receive low-stock alerts and reordering reminders.</li>
              <li>Generate detailed reports on stock movement and trends.</li>
              <li>Ensure products are stocked in the right location for easy access.</li>
            </ul>
            <p className="text-lg text-gray-600">
              With these tools, you can streamline your inventory operations, reduce costs, and improve efficiency.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 md:pl-12">
            {/* Reduced Image Size */}
            <img src={About3} alt="Dashboard Screenshot" className="w-[400px] h-[300px] shadow-lg mx-auto" />
          </div>
        </div>
      </div>
    </div>