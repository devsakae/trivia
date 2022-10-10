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

  // Refatorado para apenas ativar o answerClick
  verificaAnswer = () => {
    this.setState({ answerClick: true });
  };

  nextQuestion = () => {
    this.setState((prevState) => ({
      answerClick: false,
      indexQuestion: prevState.indexQuestion + 1,
    }));
  };

  getAnswers = (data) => {
    const unshuffle = [...data.incorrect_answers, data.correct_answer];
    const { answerClick } = this.state;
    const shuffle = this.shuffle(unshuffle);

    // O shuffle está embaralhando após o onClick do button
    return shuffle.map((item, index) => (
      item === data.correct_answer ? (
        <button
          type="button"
          key={ item }
          data-testid="correct-answer"
          className={ answerClick ? 'right' : 'neither' }
          onClick={ () => this.verificaAnswer() }
        >
          { item }
        </button>
      ) : (
        <button
          type="button"
          key={ item }
          data-testid={ `wrong-answer-${index}` }
          // Refatorado para um simples ternário
          className={ answerClick ? 'wrong' : 'neither' }
          onClick={ () => this.verificaAnswer() }
        >
          {item}
        </button>
      )
    ));
  };

  render() {
    const { data, indexQuestion, answerClick } = this.state;
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
            { this.getAnswers(data[indexQuestion]) }
            { answerClick && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.nextQuestion }
              >
                Next
              </button>
            ) }
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
