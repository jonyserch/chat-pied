import {
  GET_MESSAGE,
  SET_MESSAGE,
  GET_CONVERSATION,
} from '../constants/action-types';

const initialState = {
  messages: {},
  conversation: {},
};
export function rootReducer(state = initialState, action) {
  if (action.type === GET_MESSAGE) {
    return Object.assign({}, state, {
      messages: action.payload,
    });
  }
  if (action.type === GET_CONVERSATION) {
    return Object.assign({}, state, {
      conversation: action.payload,
    });
  }
  if (action.type === SET_MESSAGE) {
    let values = state.messages.messages.concat(action.payload);

    return { ...state, messages: { ...state.messages, messages: values } };
  }

  return state;
}
