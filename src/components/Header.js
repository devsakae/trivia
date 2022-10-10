import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends Component {
  render() {
    const { nome, email } = this.props;
    return (
      <>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${MD5(email).toString()}` }
          alt="profile"
        />
        <p data-testid="header-player-name">{ nome }</p>
        <p data-testid="header-score">Placar: 0</p>
      </>
    );
  }
}

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  nome: state.player.nome,
  email: state.player.email,
});

export default connect(mapStateToProps)(Header);
