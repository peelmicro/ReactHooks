import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 0,
    isOn: false,
    x: null,
    y: null
  }

  componentDidMount() {
    document.title = `You have been clicked ${this.state.count} times`;
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  componentDidUpdate() {
    document.title = `You have been clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  incrementCount = () => {
    this.setState(previousState => ({ count: previousState.count + 1}));
  }

  toggleLight = () => {
    this.setState(previousState => ({ isOn: !previousState.isOn}));
  }

  handleMouseMove = event => {
    this.setState({
      x: event.pageX,
      y: event.pageY
    })
  }

  render() {
    return (
      <>
        <h2>Counter</h2>
        <button onClick={() => this.incrementCount()}>I was clicked {this.state.count} times</button>

        <h2>Toggle Light</h2>
        <div 
          style={{
            height: '50px',
            width: '50px',
            background: this.state.isOn ? 'yellow' : 'grey'
          }}
          onClick={this.toggleLight}
          >
        </div>

        <h2>Mouse Position</h2>
        <p>X position: {this.state.x}</p>
        <p>Y position: {this.state.y}</p>
      </>
    );
  }
}

export default App;
