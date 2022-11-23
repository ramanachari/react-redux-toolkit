const redux = require('redux');
const https = require('https');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  isLoading: false,
  data: [],
  error: '',
};

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchUsersSucces = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };

    case FETCH_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    axios.defaults.httpsAgent = httpsAgent;

    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        // response.data is the users
        const users = response.data.map((user) => user.id);
        dispatch(fetchUsersSucces(users));
      })
      .catch((error) => {
        //error.message is the error message
        const errorMessage = error.message;
        dispatch(fetchUsersFailure(errorMessage));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());
