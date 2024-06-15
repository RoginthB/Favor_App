import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import theme from './Themes'
import { Provider } from 'react-redux'
import App from './App';
import store from './store'
import { ThemeProvider } from '@mui/material';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
  
);
