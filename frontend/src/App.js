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
import FicHome from "./Components/FIC/FicHome";
import AddProduct from "./Components/FIC/AddProduct";
import AddDepartment from "./Components/FIC/AddDepartment";
import Requests from "./Components/FIC/Requests.";
import Returns from "./Components/Authority/Returns";
import AuthorityReports from "./Components/Authority/Reports";
import ViewSpecific from "./Components/User/ViewSpecific";

import FICDeptReports from "./Components/FIC/FICDeptReports";
import ProductUpdateForm from "./Components/FIC/ProductUpdateForm";
import OrderDetails from "./Components/Authority/OrderDetails";
import ProductUpdate from "./Components/FIC/ProductUpdate";
import AuthorityProtected from "./Components/ProtectedRoutes/AuthorityProtected";
import FicProtected from "./Components/ProtectedRoutes/FicProtected";
import UserProtected from "./Components/ProtectedRoutes/UserProtected";
import AuthorityDeptReports from "./Components/Authority/AuthorityDeptReports";
import FCIReturns from "./Components/FIC/Returns";

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
        element: <ViewSpecific />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/user-Home",
        element: <UserProtected element={UserHome} />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/authority-home",
        element: <AuthorityProtected element={AuthorityHome} />,
      },
      {
        path: "/authority/authority-orders",
        element: <AuthorityProtected element={AuthorityOrder} />,
      },
      {
        path: "/authority/returns",
        element: <AuthorityProtected element={Returns} />,
      },
      {
        path: "/authority/reports",
        element: <AuthorityProtected element={AuthorityReports} />,
      },
      {
        path: "/user-returnform",
        element: <UserProtected element={ReturnForm} />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/fic-home",
        element: <FicProtected element={FicHome} />,
      },
      {
        path: "/fic-reports",
        element: <FicProtected element={FICDept} />,
      },
      {
        path: "/fic-reports/:deptId",
        element: <FicProtected element={FICDeptReports} />,
      },
      {
        path: "/fic/add-product",
        element: <FicProtected element={AddProduct} />,
      },
      {
        path: "/fic/add-department",
        element: <FicProtected element={AddDepartment} />,
      },
      {
        path: "/fic/requests",
        element: <FicProtected element={Requests} />,
      },
      {
        path: "/fic/returns",
        element: <FicProtected element={FCIReturns} />,
      },
      {
        path: "/fic/update-product/:productId",
        element: <FicProtected element={ProductUpdate} />,
      },
      {
        path: "/authority/authority-orders/:orderId",
        element: <AuthorityProtected element={OrderDetails} />,
      },
      {
        path: "/authority/reports/:departmentId",
        element: <AuthorityProtected element={AuthorityDeptReports} />,
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
