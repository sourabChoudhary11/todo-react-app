import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createContext } from 'react';

export const ourServer = "https://nodejs-todoapp-wlox.onrender.com/api/v1";

export const DataContext = createContext({});

const AppWraper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <DataContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser }}>
      <App />
    </DataContext.Provider>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AppWraper />
  </React.StrictMode>
);

reportWebVitals();
