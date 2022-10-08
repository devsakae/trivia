import { userLogin } from '../redux/actions';

export const getToken = async (history, dispatch, payload) => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const json = await response.json();
  const { token } = json;
  dispatch(userLogin({ ...payload, token }));

  localStorage.setItem('token', token);
  history.push('/game');
};

export const fetchAPI = async (token, history) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const INVALID_TOKEN_ERROR = 3;
  const response = await fetch(URL);
  const json = await response.json();
  if (json.response_code === INVALID_TOKEN_ERROR) {
    localStorage.removeItem('token');
    history.push('/');
  }
  const { results } = json;
  return response.ok ? Promise.resolve(results) : Promise.reject(json);
};
