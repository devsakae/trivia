import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchAPI } from '../services/fetchAPI';

class Game extends Component {
  state = {
    data: [],
    indexQuestion: 0,
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

  getAnswers = (data) => {
    const unshuffle = [...data.incorrect_answers, data.correct_answer];
    const shuffle = this.shuffle(unshuffle);
    return shuffle.map((item, index) => (
      item === data.correct_answer ? (
        <button key={ item } type="button" data-testid="correct-answer">
          {item}
        </button>
      ) : (
        <button type="button" key={ item } data-testid={ `wrong-answer-${index}` }>
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
