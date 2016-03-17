import React from 'react';
import Timer from './timer.jsx'

var questionList = {
    1 : {
      question: "What color is Mars?",
      answer: "red"
    },
    2 : {
      question: "What is the name of the Looney Tunes' martian?",
      answer: "marvin"
    },
    3 : {
      question: "Who is J'onn J'onzz?",
      answer: "martian manhunter"
    }
};

var Question = React.createClass({

  getInitialState: function() {
    return {
      start: false,
      questionIndex: 1
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

  _questionDisplay: function() {
    return (
      <span>{ questionList[this.state.questionIndex].question }</span>
    );
  },

  _handleSubmit: function(e) {
    e.preventDefault();
    this.setState({ questionIndex: this.state.questionIndex + 1 });
    // clears the inpur field on user submission
    this.refs.userInput.value = "";
  },

  render: function() {
    return (
      <div className="quiz-window">
        <div className={ "quiz-timer " + this._toggleDisplay(true) }>
          <Timer minuteNumber={ 1 } startQuizHandler={ this.state.start } />
        </div>

        <button className={ "button-style " + this._toggleDisplay(false) } onClick={ this._startQuizHandler }>Begin Evaluation</button>

        <div className={ "quiz-box " + this._toggleDisplay(true) }>
          <p>{ this._questionDisplay() }</p>
          <input className="answer-input" type="text" ref="userInput" />
          <button className="button-style" type="submit" onClick={ this._handleSubmit }>Submit Answer</button>
        </div>
      </div>
    );
  }

});

module.exports = Question;
