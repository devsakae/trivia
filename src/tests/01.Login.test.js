import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import App from '../App';

const loginMock = { email: 'teste@hotmail.com', name: 'Testando' };

describe('Testes de login', () => {
  test('Verifica os campos de login nome são renderizados e é possivel digitar', () => {
    renderWithRouterAndRedux(<Login />);

    const inputName = screen.getByPlaceholderText(/nome do jogador/i);
    expect(inputName).toBeInTheDocument();

    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    expect(inputEmail).toBeInTheDocument();

    const playButton = screen.getByRole('button', { name: /jogar/i });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();

    userEvent.type(inputName, loginMock.name);
    userEvent.type(inputEmail, loginMock.email);
    expect(playButton).toBeEnabled();

    const buttonSettings = screen.getByRole('button', { name: /configurações/i });
    expect(buttonSettings).toBeInTheDocument();
  });
});

describe('Testes do App', () => {
  test('Teste da rota de configurações', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const buttonSettings = screen.getByRole('button', { name: /configurações/i });
    userEvent.click(buttonSettings);

    const settingsText = await screen.findByRole('heading', {
      name: /settings page/i,
    });
    expect(settingsText).toBeInTheDocument();
  });

  test('Teste da rota de game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText(/nome do jogador/i);
    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    const playButton = screen.getByRole('button', { name: /jogar/i });

    userEvent.type(inputName, loginMock.name);
    userEvent.type(inputEmail, loginMock.email);
    userEvent.click(playButton);

    const name = await screen.findByText(loginMock.name);
    const img = screen.getByRole('img', { name: /profile/i });
    const placar = screen.getByText(/sua pontuação:/i);

    expect(placar).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(history.location.pathname).toBe('/game');
  });
});
