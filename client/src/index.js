import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.css';
import {Provider} from 'react-redux';
import store from "./store"
import App from './components/App';
import registerServiceWorker from './components/registerServiceWorker';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
