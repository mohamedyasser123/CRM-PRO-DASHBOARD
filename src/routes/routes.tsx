import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import CustomerPage from "../modules/customers/pages/CustomerPage";
import DealsPage from "../modules/deals/pages/DealsPage";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/customers" replace />,
      },
      {
        path: 'customers',
        element: <CustomerPage />,
      },
   
      {
        path: 'dashboard',
        element: <div>Dashboard Overview</div>,
      },
      {
        path: 'deals',
        element: <DealsPage/>,
      },
      {
        path: 'tasks',
        element: <div>Tasks Module</div>,
      },
      {
        path: 'products',
        element: <div>Products Module</div>,
      },
      {
        path: 'analytics',
        element: <div>Analytics Module</div>,
      },
      {
        path: 'settings',
        element: <div>Settings Module</div>,
      },
    ],
  },
  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },
]);