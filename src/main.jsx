import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './components/Context/AuthContext';
import { SRProvider } from './components/Context/SRContext';

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <AuthProvider>
      <SRProvider>
        <RouterProvider router={router} />
      </SRProvider>
    </AuthProvider>
  </React.StrictMode>

);