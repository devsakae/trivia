import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';

export class Login extends Component {
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

  inicializaJogo = (token) => {
    const { history } = this.props;
    localStorage.setItem('token', token);
    history.push('/game');
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    dispatch(userLogin(this.state));
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((obj) => this.inicializaJogo(obj.token))
      .catch((err) => { throw newError(err); });
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
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default connect()(Login);
