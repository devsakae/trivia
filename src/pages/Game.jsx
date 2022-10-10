import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Trivia from '../components/Trivia';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <Trivia history={ history } />
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default connect()(Game);
