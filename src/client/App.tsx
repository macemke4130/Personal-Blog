import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllBlogs from './AllBlogs';
import NewBlog from './NewBlog';
import Admin from './Admin';
import OneBlog from './OneBlog';

const App = (props: AppProps) => {

	return (
		<Router>
			<Switch>
				<Route path="/admin/:id/" component={Admin} />
				<Route path="/new/" component={NewBlog} />
				<Route path="/blogpost/:id" component={OneBlog} />
				<Route exact path="/" component={AllBlogs} />
			</Switch>
		</Router>
	);
};

interface AppProps { }

export default App;
