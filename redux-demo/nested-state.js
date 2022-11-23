const redux = require('redux');
const produce = require('immer').produce;

const initialState = {
  name: 'Venkata',
  address: {
    streat: 'Burumpeta',
    city: 'Narasaraopet',
    state: 'A.P',
  },
};

const STREAT_UPDATED = 'STREAT_UPDATED';

const updateStreat = (streat) => {
  return {
    type: STREAT_UPDATED,
    payload: streat,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREAT_UPDATED:
      return produce(state, (draft) => {
        draft.address.streat = action.payload;
      });

    //   return {
    //     ...state,
    //     address: {
    //       ...state.address,
    //       streat: action.payload,
    //     },
    //   };

    default:
      return state;
  }
};

const store = redux.createStore(reducer);
console.log(store.getState());

store.subscribe(() => console.log('pdate state', store.getState()));

store.dispatch(updateStreat('CPT'));
