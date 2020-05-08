import React from 'react';
import { Uchazec } from './interfaces';

interface Props {
  onChange?: (value?: Uchazec) => void;
  disabled: boolean;
}
interface State extends Partial<Uchazec> {
}

export default class extends React.Component<Props, State> {
  state: Readonly<State> = {};

  handleChange = (field: keyof Uchazec) => ({currentTarget: {validity, value}}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({[field]: validity.valid ? value : undefined}, () => this.checkAndEmit());
  }
  handleTextChange = this.handleChange("text");
  handleEmailChange = this.handleChange("email");
  handlePhoneChange = this.handleChange("phone");
  handleCvChange = ({currentTarget: {files}}: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({cv: files?.[0]}, () => this.checkAndEmit());
  }

  private checkAndEmit() {
    if (this.state.text !== undefined && this.state.email !== undefined && this.state.phone !== undefined && this.state.cv !== undefined) {
      this.props.onChange?.({
        text: this.state.text,
        email: this.state.email,
        phone: this.state.phone,
        cv: this.state.cv,
      });
    } else {
      this.props.onChange?.(undefined);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="text">Text</label>
          <textarea onChange={this.handleTextChange} className="form-control" id="text" required maxLength={1000} disabled={this.props.disabled}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={this.handleEmailChange} className="form-control" id="email" required disabled={this.props.disabled}/>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefon</label>
          <input type="tel" onChange={this.handlePhoneChange} className="form-control" id="phone" required disabled={this.props.disabled}/>
        </div>
        <div className="form-group">
          <label htmlFor="cv">Životopis</label>
          <input type="file" onChange={this.handleCvChange} className="form-control" id="cv" required disabled={this.props.disabled}/>
        </div>
      </React.Fragment>
    );
  }
}
