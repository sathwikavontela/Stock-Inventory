import caurosel1 from '../utils/caurosel1.png';
import caurosel2 from '../utils/caurosel2.png';
import caurosel4 from '../utils/caurosel4.png';


const AdvanceFeatures = () => {
    
    return (
        <div className='w-full py-10 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4'>
          <h2 className="text-4xl font-bold text-center mb-8">Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 7 */}
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
              <img src={caurosel1} alt="Automate Workflows" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Automate Workflows</h3>
              <p className="text-gray-700">Streamline your processes and automate routine tasks.</p>
            </div>
            
            {/* Card 8 */}
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
              <img src={caurosel2} alt="Real-Time Reporting" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Reporting</h3>
              <p className="text-gray-700">Get insights on-demand with dynamic reporting capabilities.</p>
            </div>
            
            {/* Card 9 */}
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
              <img src={caurosel4} alt="User-Friendly Interface" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">User-Friendly Interface</h3>
              <p className="text-gray-700">Navigate effortlessly with an intuitive and clean UI.</p>
            </div>
            
            {/* Card 10 */}
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
              <img src={caurosel4} alt="Comprehensive Support" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comprehensive Support</h3>
              <p className="text-gray-700">Access 24/7 support to ensure smooth operations.</p>
            </div>

            {/* Card 11 */}
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
              <img src={caurosel1} alt="Customizable Solutions" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customizable Solutions</h3>
              <p className="text-gray-700">Tailor features and integrations to your unique needs.</p>
            </div>

            {/* Card 12 */}
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
              <img src={caurosel2} alt="Scalable Architecture" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Scalable Architecture</h3>
              <p className="text-gray-700">Grow with a system designed to scale as your business expands.</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AdvanceFeatures