import { createBrowserRouter } from "react-router-dom";
import CustomerPage from "../modules/customers/pages/CustomerPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerPage />,
  },
]);