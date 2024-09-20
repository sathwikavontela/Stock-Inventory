import { Outlet } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import LoginSignup from './Components/Login/LoginSignup'
import RequestForm from './Components/Login/RequestForm'
import About from './Components/About/About'
import UserHome from './Components/User/UserHome'
import Orders from './Components/User/Orders'
import Reports from './Components/User/Reports'
import ContactUs from './Components/Contact/ContactUs'
import FicHome from './Components/FIC/FicHome'

const Applayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Applayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <LoginSignup />,
      },
      {
        path: '/requests',
        element: <RequestForm />,
      },
      {
        path: '/about-us',
        element: <About />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/reports',
        element: <Reports />,
      },
      {
        path: '/user-Home',
        element: <UserHome />,
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/fic-home',
        element: <FicHome />,
      },
    ],
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
