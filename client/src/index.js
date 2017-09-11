import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import App from './containers/App';
import Trade from './components/Trade';

import configureStore from './store';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const app = (
	<Provider store={configureStore()}>
		<Router>
			<div>
				<Route exact path="/" component={App} />
				<Route path="/trade/:ticker" render={props => <Trade {...props} />} />
			</div>
		</Router>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
