import React from 'react';
import {browserHistory} from 'react-router';

var Welcome = React.createClass({

  beginEval: function(){
    browserHistory.push('/begin')
  },

  render: function(){
    return (
      <div className="quiz-window">
        <button className="start-button" onClick={ this.beginEval }>Take Test</button>
      </div>
    )
  }

});

module.exports = Welcome;
