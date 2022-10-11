import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends Component {
  render() {
    const { nome, email, score } = this.props;
    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${MD5(email).toString()}` }
            alt="profile"
          />
          <p data-testid="header-player-name">{ nome }</p>
        </div>
        <div>
          <h1>Trivia MG25</h1>
        </div>
        <div>
          <p>Sua pontuação:</p>
          <p data-testid="header-score">{ score }</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  nome: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Header);
