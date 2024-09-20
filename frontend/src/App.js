import { Outlet } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import UserHome from './Components/User/UserHome'
import Orders from './Components/User/Orders'
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
        path: '/user-Home',
        element: <UserHome />,
      },
      {
        path: '/orders',
        element: <Orders />,
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
