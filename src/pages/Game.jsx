import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchAPI } from '../services/fetchAPI';

class Game extends Component {
  state = {
    data: [],
    indexQuestion: 0,
    answerClick: false,
  };

  async componentDidMount() {
    const { history, token } = this.props;
    const data = await fetchAPI(token, history);
    this.setState({ data });
  }

  //  foi usado como referencia um codigo do stackoverflow https://stackoverflow.com/a/12646864

  shuffle = (array) => {
    const newArray = [...array];
    for (let currentIndex = newArray.length - 1; currentIndex > 0; currentIndex -= 1) {
      const swapIndex = Math.floor(Math.random() * (currentIndex + 1));
      [newArray[currentIndex], newArray[swapIndex]] = [newArray[swapIndex],
        newArray[currentIndex]];
    }
    return newArray;
  };

  // Essa função apenas retorna a classe de acordo com a resposta (antes do clique e depois do clique)
  answerClass = (param) => {
    const { answerClick } = this.state;
    if (answerClick && param) return 'wrong';
    if (answerClick) return 'right';
    return 'neither';
  };

  // Já esta função é o coração da resposta
  verificaAnswer = ({ target: { attributes } }) => {
    if (attributes[1].value === 'correct-answer') {
      this.setState({ answerClick: true });
    } else {
      this.setState({ answerClick: 'not' });
    }
  };

  getAnswers = (data) => {
    const unshuffle = [...data.incorrect_answers, data.correct_answer];
    const shuffle = this.shuffle(unshuffle);
    return shuffle.map((item, index) => (
      item === data.correct_answer ? (
        <button
          type="button"
          key={ item }
          data-testid="correct-answer"
          className={ this.answerClass() }
          onClick={ (e) => this.verificaAnswer(e) }
        >
          { item }
        </button>
      ) : (
        <button
          type="button"
          key={ item }
          data-testid={ `wrong-answer-${index}` }
          className={ this.answerClass('not') }
          onClick={ (e) => this.verificaAnswer(e) }
        >
          {item}
        </button>
      )
    ));
  };

  render() {
    const { data, indexQuestion } = this.state;
    return (
      <>
        <Header />
        <h4 data-testid="question-category">
          {`Categoria: ${data[indexQuestion]?.category}`}
        </h4>
        <h3 data-testid="question-text">{data[indexQuestion]?.question}</h3>
        {data[indexQuestion] && (
          <div
            data-testid="answer-options"
            className="container-col"
          >
            {this.getAnswers(data[indexQuestion])}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
});

Game.propTypes = {
  history: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
