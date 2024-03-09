import './App.css';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import UserList from './pages/UserList';
import Dashboard from './pages/Profile';
import Activation from './components/Activation';
import Welcome from './pages/Welcome';
import Delete from './pages/Delete';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
    errorElement: <Container>404 Not Found</Container>
  },
  {
    path: '/login',
    element: <LogIn />,
    errorElement: <Container>404 Not Found</Container>
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <Container>404 Not Found</Container>
  },
  {
    path: '/allusers',
    element: <UserList />,
    errorElement: <Container>404 Not Found</Container>
  },
  {
    path: '/profile',
    element: <Dashboard />,
    errorElement: <Container>404 Not Found</Container>
  },
  {
    path: '/activate/:uid/:token',
    element: <Activation />,
    errorElement: <Container>404 Not Found</Container>
  },
  {
    path: '/welcome',
    element: <Welcome />,
    errorElement: <Container>404 Not Found</Container>
  },
  {
    path: '/delete',
    element: <Delete />,
    errorElement: <Container>404 Not Found</Container>
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
