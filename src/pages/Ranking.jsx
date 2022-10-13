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
      <section className="ranking">
        <h1
          data-testid="ranking-title"
        >
          Confira o ranking!
        </h1>
        {
          ranking.map((item, index) => (
            <div key={ index } className="colocado">
              <h3>
                #
                { index + 1 }
              </h3>
              <img
                src={ `https://www.gravatar.com/avatar/${MD5(item.email).toString()}` }
                alt="profile"
              />
              <p data-testid={ `player-name-${index}` } className="nm">
                { (index === 0) && '🏆' }
                { (index === 1) && '🥈' }
                { (index === 2) && '🥉' }
                { ' ' }
                { item.nome }
              </p>
              <p data-testid={ `player-score-${index}` }>{ item.score }</p>
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
