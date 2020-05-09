import React from 'react';
import PobockaInput from './PobockaInput';
import PoziceInput from './PoziceInput';
import UchazecInput from './UchazecInput';
import { Pobocka, Pozice, Uchazec } from './interfaces';
import { upload } from './fetch-service';

interface State {
  pobocka?: Pobocka;
  pozice?: Pozice;
  uchazec?: Uchazec;
}

export default class Form extends React.Component<{}, State> {
  state: Readonly<State> = {};

  handlePobockaChange = (pobocka?: Pobocka) => {
    this.setState({pobocka});
  }
  handlePoziceChange = (pozice?: Pozice) => {
    this.setState({pozice});
  }
  handleUchazecChange = (uchazec?: Uchazec) => {
    this.setState({uchazec});
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.upload();
  }

  private async upload() {
    try {
      await upload(this.state.pozice!, this.state.uchazec!);
      alert("Úspěšně odesláno, děkujeme!");
      window.location.reload();
    } catch (e) {
      console.error("Error when uploading data:", e);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <PobockaInput onChange={this.handlePobockaChange}/>
        <PoziceInput pobocka={this.state.pobocka} onChange={this.handlePoziceChange} disabled={this.state.pobocka === undefined}/>
        <UchazecInput onChange={this.handleUchazecChange} disabled={this.state.pozice === undefined}/>
        <input type="submit" value="Odeslat" className="btn btn-primary" disabled={this.state.pozice === undefined}/>
      </form>
    );
  }
}
