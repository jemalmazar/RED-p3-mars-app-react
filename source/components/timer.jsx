import React from 'react';

var Timer = React.createClass({

  getInitialState(){
    return {
      // the convertToSeconds() returns a number as secondsElapsed's value
      secondsElapsed: this.convertToSeconds()
    };
  },

  convertToSeconds: function() {
    // minuteNumber refers to a number set as a prop of Timer on question-screen.jsx
    if ( this.props.numberOfMinutes >= 1 ){
      // takes minuteNumber and converts it into a number of seconds
      return this.props.numberOfMinutes * 60;

    } else {
      return 60;
    }
  },

  _minutesRemaining: function() {
    // this method returns the number of minutes remaining; displays the number based on if secondsElapsed/60
    return Math.floor( this.state.secondsElapsed / 60 );
  },

  _secondsRemaining: function() {
    // this method returns the remainder of secondsElapsed/60; will return/display 0 if secondsElapsed >= 60
    return Math.floor( this.state.secondsElapsed % 60 );
  },

  _tick: function() {
    // takes the secondsElapsed state and decreases that number by one every time this method gets called
    this.setState( { secondsElapsed: this.state.secondsElapsed - 1 } );

    if (this.state.secondsElapsed === 0) {
      this.componentWillUnmount();
    }

  },

  _startTimer: function() {
    if ( !this.interval ) {
        this.interval = setInterval(this.tick, 1000);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if ( nextProps.startHandler === true ) {
      this._startTimer();
    } else {
      this.componentWillUnmount();
    }
  },

  componentDidMount: function() {
    setTimeout(this.start, 0);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  render: function(){
    return (

      <span>{ this._minutesRemaining() }:{ this._secondsRemaining() < 10 ? "0" + this._secondsRemaining() : this._secondsRemaining() }</span>
    )
  }
});

module.exports = Timer;
