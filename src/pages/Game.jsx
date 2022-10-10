import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Trivia from '../components/Trivia';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <Trivia />
      </>
    );
  }
}

export default connect()(Game);
