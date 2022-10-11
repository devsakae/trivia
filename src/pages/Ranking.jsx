import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MD5 } from 'crypto-js';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const rankingAtual = JSON.parse(localStorage.getItem('ranking')) || [];
    this.setState({ ranking: rankingAtual });
  }

  render() {
    const { ranking } = this.state;
    return (
      <section>
        <h1
          data-testid="ranking-title"
        >
          Tela de ranking
        </h1>
        {
          ranking.map((item, index) => (
            <div key={ index }>
              <h1>{ index + 1 }</h1>
              <img
                src={ `https://www.gravatar.com/avatar/${MD5(item.email).toString()}` }
                alt="profile"
              />
              <h4 data-testid={ `player-name-${index}` }>{ item.nome }</h4>
              <h4 data-testid={ `player-score-${index}` }>{ item.score }</h4>
            </div>
          ))
        }
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Início
          </button>
        </Link>
      </section>
    );
  }
}

export default Ranking;
