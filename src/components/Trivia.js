import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchAPI } from '../services/fetchAPI';
import { addScore } from '../redux/actions';

const UM_SEGUNDO = 1000;
const TRINTA_SEGUNDOS = 30000;
const CINCO = 5;

class Trivia extends Component {
  state = {
    data: [],
    array: [],
    indexQuestion: 0,
    answerClick: false,
    segundos: 30,
    redirect: false,
  };

  async componentDidMount() {
    const { history, token } = this.props;
    const { indexQuestion } = this.state;
    const data = await fetchAPI(token, history);
    this.setState({ data });
    this.shuffle(data, indexQuestion);
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  startTimer = () => {
    const { answerClick } = this.state;
    this.setState({ segundos: 30 });
    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({ segundos: prevState.segundos - 1 }));
    }, UM_SEGUNDO);
    this.myTimeout = setTimeout(() => {
      if (answerClick) {
        this.verificaAnswer();
      } else {
        clearInterval(this.myInterval);
        this.setState({ answerClick: true });
      }
    }, TRINTA_SEGUNDOS);
  };

  shuffle = (data, index) => {
    if (data.length === 0) return [];
    const unshuffle = [...data[index].incorrect_answers,
      data[index].correct_answer];
    const newArray = [...unshuffle];
    for (let currentIndex = newArray.length - 1; currentIndex > 0; currentIndex -= 1) {
      const swapIndex = Math.floor(Math.random() * (currentIndex + 1));
      [newArray[currentIndex], newArray[swapIndex]] = [newArray[swapIndex],
        newArray[currentIndex]];
    }
    this.setState({ array: newArray });
  };

  verificaAnswer = (param) => {
    this.setState({ answerClick: true });
    clearTimeout(this.myTimeout);
    clearInterval(this.myInterval);
    const { data, indexQuestion, segundos } = this.state;
    const { player, dispatch } = this.props;
    const dificuldade = data[indexQuestion].difficulty;
    const { assertions, score } = player;
    const atualScore = score;
    const MAX_POINTS = 3;
    const POINTS = 10;
    let points;
    if (dificuldade === 'easy') points = 1;
    if (dificuldade === 'medium') points = 2;
    if (dificuldade === 'hard') points = MAX_POINTS;
    if (segundos > 0 && param === true) {
      const sum = POINTS + (segundos * points) + atualScore;
      const totalAssertions = assertions + 1;
      dispatch(addScore({ score: sum, assertions: totalAssertions }));
    }
  };

  nextQuestion = () => {
    const { indexQuestion } = this.state;
    const sum = indexQuestion + 1;
    if (sum === CINCO) {
      this.setState({
        redirect: true,
      });
      return;
    }
    this.setState({
      answerClick: false,
      indexQuestion: sum,
    });
    const { data } = this.state;
    this.shuffle(data, sum);
    this.startTimer();
  };

  getAnswers = () => {
    const { array, data, indexQuestion, answerClick } = this.state;
    return array.map((item, index) => (
      item === data[indexQuestion]?.correct_answer ? (
        <button
          type="button"
          key={ item }
          data-testid="correct-answer"
          className={ answerClick ? 'right' : 'neither' }
          onClick={ () => this.verificaAnswer(true) }
          disabled={ answerClick }
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
          onClick={ () => this.verificaAnswer(false) }
          disabled={ answerClick }
        >
          {item}
        </button>
      )
    ));
  };

  render() {
    const { data, indexQuestion, segundos, answerClick, redirect } = this.state;
    return (
      <>
        { redirect && <Redirect to="/feedback" /> }
        { redirect
        || (
          <div>
            <h4 data-testid="question-category">
              {`Categoria: ${data[indexQuestion]?.category}`}
            </h4>
            <h3 data-testid="question-text">{data[indexQuestion]?.question}</h3>
            <div data-testid="answer-options">{this.getAnswers()}</div>
            { answerClick ? (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.nextQuestion }
              >
                Next
              </button>
            )
              : (
                <div>{ segundos }</div>
              ) }
          </div>
        ) }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
  player: state.player,
});

Trivia.propTypes = {
  history: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
  player: PropTypes.shape({
    assertions: PropTypes.number,
    score: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Trivia);
