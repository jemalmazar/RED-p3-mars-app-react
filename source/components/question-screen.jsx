import React from 'react';
import {browserHistory} from 'react-router';

import Timer from './timer.jsx'

var questionList = {
    1 : {
      question: "What color is Mars?",
      answer: "Red"
    },
    2 : {
      question: "What is the name of the Looney Tunes martian?",
      answer: "Marvin"
    },
    3 : {
      question: "Who is J'onn J'onzz?",
      answer: "Martian Manhunter"
    },
    4: {

    }
};

var Question = React.createClass({

  getInitialState: function() {
    return {
      start: false,
      questionIndex: 1,
      correctAnswers: 0
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
    this.setState({ start: true });
  },

  _questionDisplay: function() {
    return (
      <span>{ questionList[this.state.questionIndex].question }</span>
    );
  },

  _handleSubmit: function(e) {
    e.preventDefault();
    this.setState({ questionIndex: this.state.questionIndex + 1 });
    this._evaluateUserInput();
  },

  _evaluateUserInput: function() {
    if ( this.refs.userInput.value.toLowerCase() === questionList[this.state.questionIndex].answer.toLowerCase() ) {
      this.setState({ correctAnswers: this.state.correctAnswers + 1 })
    };
    // clears the input field on user submission
    this.refs.userInput.value = "";

  },

  _evaluateQuiz: function() {
    if ( this.state.correctAnswers === 3 ) {
      browserHistory.push('/accepted');
    } else {
      browserHistory.push('/rejected');
    }
  },

  componentDidUpdate: function() {
    if ( this.state.questionIndex > 3 ) {
      this._evaluateQuiz();
    };
  },

  render: function() {
    return (
      <div className="quiz-window questions">
        <div className={ "quiz-timer " + this._toggleDisplay(true) }>
          <Timer numberOfMinutes={ 1 } startHandler={ this.state.start } />
        </div>

        <button className={ "button-style " + this._toggleDisplay(false) } onClick={ this._startQuizHandler }>Begin Evaluation</button>

        <div className={ "quiz-box " + this._toggleDisplay(true) }>
          <form>
            <p>{ this._questionDisplay() }</p>
            <input className="answer-input" type="text" placeholder="Please enter your answer" ref="userInput" autoFocus={ true }/>
            <button className="button-style" type="submit" onClick={ this._handleSubmit }>Submit Answer</button>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = Question;
