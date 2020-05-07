import React from 'react';
import { getPozice } from './fetch-service';
import { Pobocka, Pozice } from './interfaces';

interface Props {
  pobocka?: Pobocka;
  onChange?: (value?: Pozice) => void
}
interface State {
  data?: Pozice[];
  disabled: boolean;
}

export default class extends React.Component<Props, State> {
  state: Readonly<State> = {
    disabled: true,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.pobocka !== this.props.pobocka) {
      this.setState({
        disabled: true,
        data: [],
      });
      if (this.props.pobocka) {
        this.loadPozice(this.props.pobocka);
      }
    }
  }

  private async loadPozice(pobocka: Pobocka) {
    try {
      this.setState({
        data: await getPozice(pobocka),
        disabled: false,
      });
    } catch (e) {
      console.error("Error when loading pobocky:", e);
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let poziceId = Number(event.currentTarget.value);
    let pozice = this.state.data?.find(pozice => pozice.id === poziceId);
    this.props.onChange?.(pozice);
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor="pozice">Pozice</label>
        <select onChange={this.handleChange} className="form-control" id="pozice">
          <option>Vyberte pozici...</option>
          {this.state.data?.map(pozice => <option key={pozice.id} value={pozice.id}>{pozice.name}</option>)}
        </select>
      </div>
    );
  }
}
