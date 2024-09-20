import caurosel1 from '../utils/caurosel1.png';
import caurosel2 from '../utils/caurosel2.png';
import caurosel4 from '../utils/caurosel4.png';


const Features = () =>{
    return (
    
      <div className='w-full py-10 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <h2 className="text-4xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
            <img src={caurosel1} alt="Speed Up Orders" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Simplify & Speed-Up Orders</h3>
            <p className="text-gray-700">Save time & automate reconciliation.</p>
          </div>
          
          {/* Card 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
            <img src={caurosel2} alt="Minimize Stock-Outs" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Minimize Stock-Outs</h3>
            <p className="text-gray-700">Easily manage multiple Cost & Profit Centers through dimensions.</p>
          </div>
          
          {/* Card 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
            <img src={caurosel4} alt="Reduce Excess Inventory" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Reduce Excess Inventory</h3>
            <p className="text-gray-700">Easily control billing and forecast upcoming payments.</p>
          </div>
          
          {/* Card 4 */}
          <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
            <img src={caurosel4} alt="Focus On What Matters" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Focus On What Matters</h3>
            <p className="text-gray-700">Focus your attention and capital on items that are more profitable.</p>
          </div>

          {/* Card 5 */}
          <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
            <img src={caurosel1} alt="Easily Forecast & Plan" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easily Forecast & Plan</h3>
            <p className="text-gray-700">Generate forecasts based on performance to plan better.</p>
          </div>

          {/* Card 6 */}
          <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
            <img src={caurosel2} alt="Seamless Integration" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
            <p className="text-gray-700">Seamless information flow across departments to achieve greater efficiency and cost-effectiveness.</p>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Features 