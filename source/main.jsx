var React = require('react');
var ReactDOM = require('react-dom');

import { Router, Route, browserHistory, Redirect } from 'react-router';

// Components
import Welcome from './components/welcome-screen.jsx';
import Timer from './components/timer.jsx';
import Question from './components/question-screen.jsx';
import Accepted from './components/accepted.jsx';
import Rejected from './components/rejected.jsx';
import NotFound from './components/404.jsx';

var App = React.createClass({
  render: function() {
    return (
      <Router history={ browserHistory }>
        <Redirect from='/' to='/welcome' />
        <Route path='/welcome' component={ Welcome }/>
        <Route path='/timer' component={ Timer }/>
        <Route path='/quiz' component={ Question }/>
        <Route path='/accepted' component={ Accepted }/>
        <Route path='/rejected' component={ Rejected }/>
        <Route path='*' component={ NotFound } />
      </Router>
    );
  }
});

ReactDOM.render(<App />, document.querySelector('.mount-node'));
