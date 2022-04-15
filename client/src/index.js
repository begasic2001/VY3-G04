import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
=======
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
>>>>>>> a06811a (Upload V2)
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

<<<<<<< HEAD
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
=======
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
>>>>>>> a06811a (Upload V2)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
