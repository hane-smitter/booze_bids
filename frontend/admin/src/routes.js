import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import CategoriesList from './pages/CategoriesList';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Settings from './pages/Settings';
import ProductBidCreate from './components/Form/Product/ProductBidCreate';
import ProductCategoryCreate from './components/Form/Product/ProductCategoryCreate';
import ProductCreate from './components/Form/Product/ProductCreate';
import Products from './components/Products/Products';
import CategoriesListResults from './components/categories/CategoriesListResults';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'categories',
        element: <CategoriesList />,
        children: [
          { path: '', element: <CategoriesListResults /> },
          { path: 'createcat', element: <ProductCategoryCreate /> }
        ]
      },
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'products',
        element: <ProductList />,
        children: [
          { path: '', element: <Products /> },
          { path: 'create', element: <ProductCreate /> },
          { path: 'createbid', element: <ProductBidCreate /> },
          // { path: 'createcat', element: <ProductCategoryCreate /> }
        ]
      },
      { path: 'settings', element: <Settings /> },
      { path: '', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
