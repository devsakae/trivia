import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  state = {
    nome: '',
    email: '',
    disabledButton: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { nome, email } = this.state;
      if (nome && email) {
        this.setState({ disabledButton: false });
      } else {
        this.setState({ disabledButton: true });
      }
    });
  };

  render() {
    const { name, email, disabledButton } = this.state;
    return (
      <div>
        <h2>Bem vindo ao jogo de Trivia.</h2>
        <form>
          <label htmlFor="name">
            <input
              type="text"
              name="nome"
              data-testid="input-player-name"
              placeholder="Digite seu nome"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            placeholder="Digite seu e-mail"
            value={ email }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabledButton }
          >
            Play
          </button>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
