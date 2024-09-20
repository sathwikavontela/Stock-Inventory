import caurosel1 from '../utils/caurosel1.png';
import caurosel2 from '../utils/caurosel2.png';
import caurosel4 from '../utils/caurosel4.png';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Caurosel = () => {
    return (
        <div className='w-full min-h-[90vh] flex justify-center items-center mt-20'>
        <Carousel 
          showThumbs={false} 
          autoPlay 
          infiniteLoop 
          interval={2000} 
          showStatus={false} 
          className="w-full"
        >
          {/* Slide 1 */}
          <div className="flex flex-col md:flex-row items-center justify-between p-3">
            <div className="text-left md:w-1/3">
              <h2 className="text-5xl font-bold mb-4 ml-10">Gain Control | Tame Costs | Boost Revenues</h2>
              <p className="text-2xl ml-10">
                Optimize Inventory Management & Maximize Stock Efficiency. In today's competitive world, tracking inventory with an end-to-end view is key for any business to ensure sustained growth and profitability.
              </p>
            </div>
            <div className="flex justify-center md:w-1/2">
              <img src={caurosel1} alt="Inventory Management" />
            </div>
          </div>
          
          {/* Slide 2 */}
          <div className="flex flex-col md:flex-row items-center justify-between p-3">
            <div className="text-left md:w-1/3 p-3">
              <h2 className="text-5xl font-bold mb-4 ml-10">Streamline Operations</h2>
              <p className="text-2xl ml-10">
                Automate, track, and maintain the supply chain, running it like well-oiled machinery for optimal inventory levels with key insights and forecasts available in real-time.
              </p>
            </div>
            <div className="flex justify-center md:w-1/2">
              <img src={caurosel2} alt="Supply Chain Management" />
            </div>
          </div>

          {/* Slide 3 */}
          <div className="flex flex-col md:flex-row items-center justify-between p-3">
            <div className="text-left md:w-1/3 p-3">
              <h2 className="text-5xl font-bold mb-4 ml-10">Enhance Visibility</h2>
              <p className="text-2xl ml-10">
                Enhance visibility into your inventory and supply chain operations, and make data-driven decisions with real-time insights and analytics.
              </p>
            </div>
            <div className="flex justify-center md:w-1/2">
              <img src={caurosel4} alt="Visibility Enhancement" />
            </div>
          </div>
        </Carousel>
      </div>
    );
}

export default Caurosel