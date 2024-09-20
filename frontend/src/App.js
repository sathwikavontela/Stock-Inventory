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
import AuthorityHome from './Components/Authority/AuthorityHome'
import AuthorityOrder from './Components/Authority/AuthorityOrder'
import FicHome from './Components/FIC/FicHome'
import FICDept from './Components/FIC/FICDept'
import ReturnForm from './Components/Login/ReturnForm'

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
        path:'/contact-us',
        element :<ContactUs />
      },
      {
        path:'/authority-home',
        element :<AuthorityHome />
      },
      {
        path: '/authority/authority-orders',
        element: <AuthorityOrder />,
      },
      {
        path: '/user-returnform',
        element: <ReturnForm />,
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/fic-home',
        element: <FicHome />,
      },
      {
        path: '/fic-reports',
        element: <FICDept />,
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
