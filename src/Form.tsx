import React from 'react';
import PobockaInput from './PobockaInput';
import PoziceInput from './PoziceInput';
import { Pobocka, Pozice } from './interfaces';

interface State {
  pobocka?: Pobocka;
  pozice?: Pozice;
}

export default class Form extends React.Component<{}, State> {
  state: Readonly<State> = {};

  handlePobockaChange = (pobocka?: Pobocka) => {
    this.setState({pobocka});
  }
  handlePoziceChange = (pozice?: Pozice) => {
    this.setState({pozice});
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted.");
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <PobockaInput onChange={this.handlePobockaChange}/>
        <PoziceInput pobocka={this.state.pobocka} onChange={this.handlePoziceChange}/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}
