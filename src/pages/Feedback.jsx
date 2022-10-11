import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  validateScore = (score) => {
    const SCORE_PARAMETER = 3;
    let feedbackMessage;
    if (score < SCORE_PARAMETER) {
      feedbackMessage = 'Could be better...';
    } else if (score >= SCORE_PARAMETER) {
      feedbackMessage = 'Well Done!';
    }
    return feedbackMessage;
  };

  render() {
    const { /* score, */ assertions } = this.props;
    const feedback = this.validateScore(assertions);

    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{feedback}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Feedback.propTypes = {
//   score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
