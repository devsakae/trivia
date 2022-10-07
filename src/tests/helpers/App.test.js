import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import Login from '../../pages/Login';
import App from '../../App';

const loginMock = { email: 'teste@hotmail.com', name: 'Testando' };

describe('Testes de login', () => {
  test('Verifica se os campos de login e nome são renderizados e é possivel digitar neles', () => {
    renderWithRouterAndRedux(<Login />);

    const inputName = screen.getByPlaceholderText(/digite seu nome/i);
    expect(inputName).toBeInTheDocument();

    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    expect(inputEmail).toBeInTheDocument();

    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();

    userEvent.type(inputName, loginMock.name);
    userEvent.type(inputEmail, loginMock.email);
    expect(playButton).toBeEnabled();

    const buttonSettings = screen.getByRole('button', { name: /settings/i });
    expect(buttonSettings).toBeInTheDocument();
  });
});

describe('Testes do App', () => {
  test('Teste da rota de configurações', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const buttonSettings = screen.getByRole('button', { name: /settings/i });
    userEvent.click(buttonSettings);

    const settingsText = await screen.findByRole('heading', {
      name: /settings page/i,
    });
    expect(settingsText).toBeInTheDocument();
  });

  test('Teste da rota de game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText(/digite seu nome/i);
    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    const playButton = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, loginMock.name);
    userEvent.type(inputEmail, loginMock.email);
    userEvent.click(playButton);

    const name = await screen.findByText(loginMock.name);
    const img = screen.getByRole('img', { name: /profile/i });
    const placar = screen.getByText(/placar:/i);

    expect(placar).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(history.location.pathname).toBe('/game');
  });
});
