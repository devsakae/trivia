// import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
// import App from '../App';

// const loginMock = { email: 'teste@hotmail.com', name: 'Testando' };

// describe('Testa a tela de feedback', () => {
//   test('Verifica se aparecem os botões que precisam aparecer', async () => {
//     jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
//     renderWithRouterAndRedux(<App />);
//     const { history } = renderWithRouterAndRedux(<App />);
//     userEvent.type(screen.getByPlaceholderText(/digite seu nome/i), loginMock.name);
//     userEvent.type(screen.getByPlaceholderText(/digite seu e-mail/i), loginMock.email);
//     userEvent.click(screen.getByRole('button', { name: /play/i }));
//     await waitFor(() => {

//     });
//   });
// });
