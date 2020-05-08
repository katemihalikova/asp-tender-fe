import React from 'react';
import { getPobocky } from './fetch-service';
import { Pobocka } from './interfaces';

interface Props {
  onChange?: (value?: Pobocka) => void;
}
interface State {
  data?: Pobocka[];
}

export default class extends React.Component<Props, State> {
  state: Readonly<State> = {};

  componentDidMount() {
    this.loadPobocky();
  }

  private async loadPobocky() {
    try {
      this.setState({
        data: await getPobocky(),
      });
    } catch (e) {
      console.error("Error when loading pobocky:", e);
    }
  }

  handleChange = ({currentTarget: {value}}: React.ChangeEvent<HTMLSelectElement>) => {
    let pobockaId = Number(value);
    let pobocka = this.state.data?.find(pobocka => pobocka.id === pobockaId);
    this.props.onChange?.(pobocka);
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor="pobocka">Pobočka</label>
        <select onChange={this.handleChange} className="form-control" id="pobocka">
          <option>Vyberte pobočku...</option>
          {this.state.data?.map(pobocka => <option key={pobocka.id} value={pobocka.id}>{pobocka.name}</option>)}
        </select>
      </div>
    );
  }
}
