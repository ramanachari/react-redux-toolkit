const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const conbineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require('redux-logger');

const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';

const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

const orderCake = () => {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
};

const restockCake = (qty = 1) => {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
};

const orderIceCream = (qty = 1) => {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
};

const restockIceCream = (qty = 1) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
};

const cakeInitialState = {
  numOfCakes: 10,
};

const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamInitialState = {
  numOfIceCreams: 20,
};

const iceCreamReducer = (state = iceCreamInitialState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    // it will respond to the cake ordered action
    case CAKE_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

const rootReducer = conbineReducers({ cakeReducer, iceCreamReducer });

const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial state', store.getState());

const unSubscribe = store.subscribe(() => {});

const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.restockCake(10);
actions.restockIceCream(10);

// store.dispatch(orderCake());
// store.dispatch(restockCake());

// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(restockCake(3));
// store.dispatch(restockCake(4));
// store.dispatch(restockCake());
// store.dispatch(restockCake());

unSubscribe();

// store.dispatch(orderCake());
