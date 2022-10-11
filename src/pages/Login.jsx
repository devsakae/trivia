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
      <section className="login-box">
        <h2>Trivia MG25</h2>
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
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default connect()(Login);
