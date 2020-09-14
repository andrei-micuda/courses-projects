import React, { Component } from 'react';
import './App.css';

import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  state = {
    inputText: ''
  }

  changedInputHandler = ev => {
    this.setState({
      inputText: ev.target.value
    });
  }

  deleteCharComponentHandler = index => {
    const oldInput = this.state.inputText.split('');
    oldInput.splice(index, 1);

    const newInput = oldInput.join('');

    this.setState({
      inputText: newInput
    });
  }

  render() {
    const charComponentList = (
      <div className="char-component-list">
        {this.state.inputText.split('').map((letter, index) =>
          <CharComponent
            letter={letter}
            key={index}
            click={() => this.deleteCharComponentHandler(index)}
          />
        )}
      </div>
    );

    return (
      <div className="App">
        <input
          type="text"
          onChange={this.changedInputHandler}
          value={this.state.inputText}
        />
        <p>{this.state.inputText}</p>
        <ValidationComponent length={this.state.inputText.length} />

        {charComponentList}
      </div>
    );
  }
}

export default App;
