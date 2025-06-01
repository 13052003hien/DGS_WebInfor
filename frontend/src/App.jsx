import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import router from './routes';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </HelmetProvider>
  );
}

export default App;