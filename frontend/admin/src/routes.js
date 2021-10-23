import { Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import MainLayout from "./components/MainLayout";
import Account from "./pages/Account";
import CategoriesList from "./pages/CategoriesList";
import AdminsList from "./pages/AdminsList";
import AdminsListResults from "./components/admins/AdminsListResults";
import AdminCreate from "./components/admins/modals/Edit/index";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Form/Auth/Login";
import ForgotPassword from "./components/Form/Auth/ForgotPassword";
import ResetPassword from "./components/Form/Auth/ResetPassword";
import NotFound from "./pages/NotFound";
import ProductList from "./pages/ProductList";
import Register from "./components/Form/Auth/Register";
import WinnersListResults from "./components/Wins/WinnersListResults";
import ProductBidCreate from "./components/Form/Product/ProductBidCreate";
import ProductCategoryCreate from "./components/Form/Product/ProductCategoryCreate";
import ProductCreate from "./components/Form/Product/ProductCreate";
import Products from "./components/Products/Products";
import CategoriesListResults from "./components/categories/CategoriesListResults";
import BidsList from "./components/bids/BidsList";
import RouteProtect from "./components/Routing/RouteProtect";
import RoutePublic from "./components/Routing/RoutePublic";
import ExpiredBidsList from "./components/bids/ExpiredBidsList";

const routes = [
  {
    path: "app",
    element: (
      <RouteProtect>
        <DashboardLayout />
      </RouteProtect>
    ),
    children: [
      { path: "account", element: <Account />},
      {
        path: "categories",
        element: <CategoriesList />,
        children: [
          { path: "", element: <CategoriesListResults /> },
          { path: "createcat", element: <ProductCategoryCreate /> },
        ],
      },
      {
        path: "admins",
        element: <AdminsList />,
        children: [
          { path: "", element: <AdminsListResults /> },
          { path: "create-admin", element: <Register /> },
        ],
      },
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "products",
        element: <ProductList />,
        children: [
          { path: "", element: <Products /> },
          { path: "create", element: <ProductCreate /> },
          { path: "createbid", element: <ProductBidCreate /> },
        ],
      },
      {
        path: "bids",
        element: <BidsList />,
      },
      {
        path: "expired-bids",
        element: <ExpiredBidsList />,
      },
      { path: "wins", element: <WinnersListResults /> },
      { path: "", element: <Navigate to="/app/dashboard" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "login",
        element: (
          <RoutePublic>
            <Login />
          </RoutePublic>
        ),
      },
      // {
      //   path: "register",
      //   element: (
      //     <RoutePublic>
      //       <Register />
      //     </RoutePublic>
      //   ),
      // },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "passwordreset/:resetToken", element: <ResetPassword /> },
      { path: "404", element: <NotFound /> },
      { path: '', element: <Navigate to="/app/dashboard" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
