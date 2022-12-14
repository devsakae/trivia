import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    const rankingAtual = JSON.parse(localStorage.getItem('ranking')) || [];
    const { nome, email, score } = this.props;
    rankingAtual.push({ nome, email, score });
    rankingAtual.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(rankingAtual));
  }

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
    const { score, assertions } = this.props;
    const feedback = this.validateScore(assertions);

    return (
      <>
        <Header />
        <section className="yourResults">
          <div className="yourScore">
            <div>
              <h2 data-testid="feedback-total-score">{ score }</h2>
              <p>pontos</p>
            </div>
            <div>
              <h2 data-testid="feedback-total-question">{ assertions }</h2>
              <p>acertos</p>
            </div>
          </div>
          <p data-testid="feedback-text">{ feedback }</p>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
            >
              Play Again

            </button>
          </Link>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
