import React from 'react';
import {browserHistory} from 'react-router';

var Begin = React.createClass({

  startQuiz: function() {
    browserHistory.push('/timer');
  },

  render: function(){
    return (
      <div className="quiz-window">
        <button className="start-button" onClick={ this.startQuiz }>Begin Evaluation</button>
      </div>
    )
  }

});

module.exports = Begin;
