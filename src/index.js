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
import Assignments from './components/Assignments';
import Licenses from './components/Licenses';
import Info from './components/Info';
import Assignment from './components/Assignment';
import AddAssignment from './components/AddAssignment';
import AddMaterials from './components/AddMaterials';
import AddImages from './components/AddImages';

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
				<Route path='/tehtava/:id' element={ <Assignment /> } />
				<Route path='lisaa-tehtava' element={ <AddAssignment />} />
				<Route path='/lisaa-materiaalit/:id' element={ <AddMaterials />} />
				<Route path='/lisaa-kuvat/:id' element={ <AddImages />} />
				<Route path='*' element={ <Home /> } />
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
