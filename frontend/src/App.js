import { Outlet } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import LoginSignup from "./Components/Login/LoginSignup";
import RequestForm from "./Components/Login/RequestForm";
import About from "./Components/About/About";
import UserHome from "./Components/User/UserHome";
import Orders from "./Components/User/Orders";
import Reports from "./Components/User/Reports";
import ContactUs from "./Components/Contact/ContactUs";
import AuthorityHome from "./Components/Authority/AuthorityHome";
import AuthorityOrder from "./Components/Authority/AuthorityOrder";
import FICDept from "./Components/FIC/FICDept";
import ReturnForm from "./Components/Login/ReturnForm";
import ViewOrder from "./Components/User/ViewOrder";
import FicHome from "./Components/FIC/FicHome";
import AddProduct from "./Components/FIC/AddProduct";
import AddDepartment from "./Components/FIC/AddDepartment";
import Requests from "./Components/FIC/Requests.";
import Returns from "./Components/Authority/Returns";
import AuthorityReports from "./Components/Authority/Reports";
import ProductUpdateForm from "./Components/FIC/ProductUpdateForm";
import OrderDetails from "./Components/Authority/OrderDetails";

import ViewSpecific from "./Components/User/ViewSpecific";
import UpdateForm from "./Components/FIC/UpdateForm";
import AuthorityViewOrder from "./Components/Authority/AuthorityViewOrder";
import FICDeptReports from "./Components/FIC/FICDeptReports";

const Applayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginSignup />,
      },
      {
        path: "/requests",
        element: <RequestForm />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orders/:orderId",
        element: <ViewOrder />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/user-Home",
        element: <UserHome />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/authority-home",
        element: <AuthorityHome />,
      },
      {
        path: "/authority/authority-orders",
        element: <AuthorityOrder />,
      },
      {
        path: "/authority/returns",
        element: <Returns />,
      },
      {
        path: "/authority/reports",
        element: <AuthorityReports />,
      },
      {
        path: "/user-returnform",
        element: <ReturnForm />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/fic-home",
        element: <FicHome />,
      },
      {
        path: "/fic-reports",
        element: <FICDept />,
      },
      {
        path: "/fic-reports/:deptId",
        element: <FICDeptReports />,
      },
      {
        path: "/fic/add-product",
        element: <AddProduct />,
      },
      {
        path: "/fic/add-department",
        element: <AddDepartment />,
      },
      {
        path: "/fic/requests",
        element: <Requests />,
      },
      {
        path: "/fic/update-product/:productId",
        element: <ProductUpdateForm />,
      },
      {
        path: "/authority/authority-orders/:orderId",
        element: <OrderDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
