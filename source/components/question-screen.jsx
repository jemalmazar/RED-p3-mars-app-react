import React from 'react';
import Timer from './timer.jsx'

var questionList = [
    {
      question: "What color is Mars?",
      answer: "Red"
    },
    {
      question: "What is the name of the Looney Tunes' martian?",
      answer: "Marvin"
    },
    {
      question: "Who is J'onn J'onzz?",
      answer: "Martian Manhunter"
    }
];

var Question = React.createClass({

  getInitialState: function() {
    return {
      start: false
    }

  },

  _toggleDisplay: function(isDisplayed) {
    if ( this.state.start !== isDisplayed) {
      return "hidden";
    } else {
      return "";
    }
  },

  _startQuizHandler: function() {
    this.setState({ start: true })
  },

  render: function() {
    return (
      <div className="quiz-window">
        <Timer minuteNumber={ 1 } startQuizHandler={ this.state.start } />

        <button className={ "button-style " + this._toggleDisplay(false) } onClick={ this._startQuizHandler }>Begin Evaluation</button>

        <div className={ "quiz-box " + this._toggleDisplay(true) }>
          <span>TESTING</span>
          <input className="answer-input" type="text" />
          <button className="button-style" type="submit">Submit Answer</button>
        </div>
      </div>
    );
  }

});

module.exports = Question;
