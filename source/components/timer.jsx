import React from 'react';

var InitializeTimer = React.createClass({

  getInitialState: function(){
    return {
      secondsElapsed: 60
    }
  },

  componentDidMount: function() {
     setTimeout(this.start, this.props.timeout);
  },

  componentWillUnmount: function(){
    this.stopTimer();
  },

  stopTimer: function(){
    clearInterval(this.interval);
    this.setState({ secondsElapsed : 0 });
  },

  tick: function(){
    if (this.state.secondsElapsed > 0) {
      this.setState({ secondsElapsed : this.state.secondsElapsed - 1});
    } else {
      this.stopTimer();
    }
  },

  start: function(){
    this.interval = setInterval(this.tick, 1000);
  },

  render: function(){
    return (
      <div className="quiz-timer">
        <span>{ this.state.secondsElapsed >= 60 ? 1 : 0}</span>
        <span>:</span>
        <span>{ this.state.secondsElapsed >= 10 ? "" : 0}</span>
        <span>{ this.state.secondsElapsed >= 60 ? "00" : this.state.secondsElapsed }</span>
      </div>
    )
  }
});

var Timer = React.createClass({
  render: function(){
    return (
      <div className='quiz-window'>
        <InitializeTimer timeout={ 0 }/>
      </div>
    )
  }
});

module.exports = Timer;
