import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Theme from './components/Theme';
import StickyFooter from './components/FooterMenu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Assignments from './components/Assigments';
import Licenses from './components/Licenses';
import Info from './components/Info';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
		<ThemeProvider theme={ Theme }>
	  		<CssBaseline />
	  		<App />
	  		<Routes>
				<Route path='/' element={ <Home /> } />
				<Route path='tehtavat' element={ <Assignments /> } />
				<Route path='lisenssit' element={ <Licenses /> } />
				<Route path='info' element={ <Info /> } />
	  		</Routes>
	  	<StickyFooter />
		</ThemeProvider>
		</BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
