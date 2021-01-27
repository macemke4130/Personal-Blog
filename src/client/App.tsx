import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllBlogs from './AllBlogs';

const App = (props: AppProps) => {

	return (
		<Router>
			<Switch>
				<Route exact path="/" component={AllBlogs} />
			</Switch>
		</Router>
	);
};

interface AppProps { }

export default App;
