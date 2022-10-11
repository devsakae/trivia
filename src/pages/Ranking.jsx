import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
//   rankingOrdenado() {
//     const pontuacao = JSON.parse(localStorage.setItem('pontuacao'));
//     pontuacao.sort((a, b) => Number(b.score) - Number(a.score));
//   }

  render() {
    return (
      <section>
        <h1
          data-testid="ranking-title"
        >
          Tela de ranking
        </h1>
        {/* {
          pontuacao.map((item, index) => (
            <div key={ index }>
              <img src={ item.picture } alt={ item.name } />
              <h4 data-testid={ `player-name-${index}` }>{ item.name }</h4>
              <h4 data-testid={ `player-score-${index}` }>{ item.score }</h4>
            </div>
          ))
        } */}
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
