import React, { Component } from 'react';

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

  fetchTrivia = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = response.token;
    console.log(token);
    // https://opentdb.com/api.php?amount=5&token=TOKEN 
  } 

  handleClick = () => {
    this.fetchTrivia();
  }



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
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
