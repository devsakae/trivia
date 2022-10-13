import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getToken } from '../services/fetchAPI';

class Login extends Component {
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

  handleClick = async () => {
    const { dispatch, history } = this.props;
    const { nome, email } = this.state;
    const assertions = 0;
    const score = 0;
    const payload = { nome, email, assertions, score };
    getToken(history, dispatch, payload);
  };

  render() {
    const { name, email, disabledButton } = this.state;
    return (
      <section className="container-login">
        <div className="login-menu">
          <img
            src={ require("../images/trybe-negativo-preferencial.png") }
            alt="Trybe Logo here"
            className="trybelogo"
          />
          <h2 className="triviaMg25">TRIVIA</h2>
          <h2 className="triviaMg25">MG25</h2>
          <form className="login-box">
            <input
              type="text"
              name="nome"
              placeholder="Nome do jogador"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
              className="input"
            />
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              required=""
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
              className="input"
            />
            <button
              type="button"
              data-testid="btn-play"
              disabled={ disabledButton }
              onClick={ this.handleClick }
              className="button"
            >
              Jogar
            </button>
            <Link to="/settings">
              <button
                type="button"
                data-testid="btn-settings"
                className="button"
              >
                Configurações
              </button>
            </Link>
          </form>
        </div>
        <div className="login-section" />
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default connect()(Login);
