import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../services/fetchAPI';

const UM_SEGUNDO = 1000;
const TRINTA_SEGUNDOS = 30000;

class Trivia extends Component {
  state = {
    data: [],
    array: [],
    indexQuestion: 0,
    answerClick: false,
    segundos: 30,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
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
      }
    }, TRINTA_SEGUNDOS);
  };

  shuffle = (data, index) => {
    const unshuffle = [...data[index].incorrect_answers,
      data[index].correct_answer];
    const newArray = [...unshuffle];
    for (let currentIndex = newArray.length - 1; currentIndex > 0; currentIndex -= 1) {
      const swapIndex = Math.floor(Math.random() * (currentIndex + 1));
      [newArray[currentIndex], newArray[swapIndex]] = [newArray[swapIndex],
        newArray[currentIndex]];
    }
    this.setState({ array: newArray });
    console.log(data[index]);
    console.log(newArray);
  };

  verificaAnswer = () => {
    this.setState({ answerClick: true });
    clearTimeout(this.myTimeout);
    clearInterval(this.myInterval);
  };

  nextQuestion = () => {
    const { indexQuestion } = this.state;
    const sum = indexQuestion + 1;
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
      item === data[indexQuestion].correct_answer ? (
        <button
          type="button"
          key={ item }
          data-testid="correct-answer"
          className={ answerClick ? 'right' : 'neither' }
          onClick={ () => this.verificaAnswer() }
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
          onClick={ () => this.verificaAnswer() }
          disabled={ answerClick }
        >
          {item}
        </button>
      )
    ));
  };

  render() {
    const { data, indexQuestion, segundos, answerClick } = this.state;
    return (
      <div>
        <h4 data-testid="question-category">
          {`Categoria: ${data[indexQuestion]?.category}`}
        </h4>
        <h3 data-testid="question-text">{data[indexQuestion]?.question}</h3>
        {this.getAnswers()}
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
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
});

Trivia.propTypes = {
  history: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Trivia);
