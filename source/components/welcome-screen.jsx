import React from 'react';
import {browserHistory} from 'react-router';

var Welcome = React.createClass({

  // methods beginning with _underscores denote that said method is only used within the component it's written
  // begin user/event handler methods with "handle" prefix
  _handleTakeTest: function(){
    browserHistory.push('/quiz')
  },

  render: function(){
    return (
      <div className="quiz-window">
        <button className="button-style" onClick={ this._handleTakeTest }>Take Test</button>
      </div>
    )
  }

});

module.exports = Welcome;
