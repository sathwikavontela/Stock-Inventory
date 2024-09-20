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
<<<<<<< HEAD
import AuthorityHome from './Components/Authority/AuthorityHome'
import AuthorityOrder from './Components/Authority/AuthorityOrder'
=======
import FicHome from './Components/FIC/FicHome'
import FICDept from './Components/FIC/FICDept'
import ReturnForm from './Components/Login/ReturnForm'
>>>>>>> 252696592fc2e538258be887c25ddf5fa38b46f1

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
<<<<<<< HEAD
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
=======
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
>>>>>>> 252696592fc2e538258be887c25ddf5fa38b46f1
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
