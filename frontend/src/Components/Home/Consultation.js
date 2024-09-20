import { Link } from "react-router-dom"

const Consultation = () =>{
    return (
        <div className="w-full py-10  flex justify-center items-center">
        <div className="text-center max-w-3xl px-4">
          <h2 className="text-5xl font-bold text-black mb-6">Get Started with a Free Demo & Consultation</h2>
          <p className="text-2xl text-black mb-6">
            Are you looking for an ERP system that can cater to all your organizational requirements? We believe our system is one of the best – simple, intuitive, and cutting edge.
          </p>
          <p className="text-xl text-black mb-8">
            Call us today and schedule a demo to see how Edge ERP can help your business grow!
          </p>
          <div className="flex justify-center space-x-6">
            <Link to='/contact-us'>
              <button className="bg-orange-500 text-black-600 px-6 py-3 rounded-lg font-semibold">Contact Us</button>
            </Link>
            <button className="bg-orange-500 text-black-600 px-6 py-3 rounded-lg font-semibold">Take a Tour</button>
          </div>
        </div>
      </div>
    )
}

export default Consultation