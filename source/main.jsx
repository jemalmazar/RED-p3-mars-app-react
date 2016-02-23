var React = require('react');
var ReactDOM = require('react-dom');

import { Router, Route, browserHistory, Redirect } from 'react-router';

// Components
import Welcome from './components/welcome-screen.jsx';
import Begin from './components/begin-screen.jsx';
import Timer from './components/timer.jsx';
import NotFound from './components/404.jsx';

var App = React.createClass({
  render: function() {
    return (
      <Router history={ browserHistory }>
        <Redirect from='/' to='/welcome' />
        <Route path='/welcome' component={ Welcome }/>
        <Route path='/begin' component={ Begin }/>
        <Route path='/timer' component={ Timer }/>
        <Route path='*' component={ NotFound } />
      </Router>
    );
  }
});

ReactDOM.render(<App />, document.querySelector('.mount-node'));
