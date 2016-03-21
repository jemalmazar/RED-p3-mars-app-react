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
    // adds the "hidden" class based on if the start state is true or false; that boolean value is passed in the render function
    if ( this.state.start !== isDisplayed) {
      return "hidden";
    } else {
      return "";
    }
  },

  _startQuizHandler: function() {
    // changes the start state when the button is clicked
    this.setState({ start: true });
  },

  _questionDisplay: function() {
    // displays the question based on the value of the questionIndex state
    return (
      <span>{ questionList[this.state.questionIndex].question }</span>
    );
  },

  _handleSubmit: function(e) {
    e.preventDefault();
    // increases the questionIndex state when the user submits
    this.setState({ questionIndex: this.state.questionIndex + 1 });
    // runs the method that checks user answers
    this._evaluateUserInput();
  },

  _evaluateUserInput: function() {
    // checks the user's input against the answer property's value
    if ( this.refs.userInput.value.toLowerCase() === questionList[this.state.questionIndex].answer.toLowerCase() ) {
      // increases the correctAnswers state should the answers match
      this.setState({ correctAnswers: this.state.correctAnswers + 1 })
    };
    // clears the input field on user submission
    this.refs.userInput.value = "";

  },

  _evaluateQuiz: function() {
    // checks if all the questions were answered correctly and pushes user to appropriate page
    if ( this.state.correctAnswers === 3 ) {
      browserHistory.push('/accepted');
    } else {
      browserHistory.push('/rejected');
    }
  },

  componentDidUpdate: function() {
    // grades the quiz once the last question has been answered
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
