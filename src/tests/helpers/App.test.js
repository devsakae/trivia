import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import Login from '../../pages/Login';
import App from '../../App';

const loginMock = { email: 'teste@hotmail.com', name: 'Testando' };

describe('Testes de login', () => {
  test('Verifica se os campos de login e nome são renderizados e é possivel digitar neles', () => {
    const { history } = renderWithRouterAndRedux(<Login />)

    const inputName = screen.getByPlaceholderText(/digite seu nome/i)
    expect(inputName).toBeInTheDocument();

    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i)
    expect(inputEmail).toBeInTheDocument();

    const playButton = screen.getByRole('button', {  name: /play/i});
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();

    userEvent.type(inputName, loginMock.name);
    userEvent.type(inputEmail, loginMock.email);
    expect(playButton).toBeEnabled();

  })
});

describe('Testes do App', () => {
  test('Teste de rotas', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/')
    const teste = 'teste'
  });
})