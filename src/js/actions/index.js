import {
  GET_MESSAGE,
  GET_CONVERSATION,
  SET_MESSAGE,
} from '../constants/action-types';

export const getMessage = idConversation => dispatch => {
  fetch(
    `https://api.mlab.com/api/1/databases/conversations/collections/conversation?q={"chat_identifier": "${idConversation}"}&apiKey=Vo12xqTxw-1M8hd2vp3w5B_Xj3FTuHGS`,
  )
    .then(response => response.json())
    .then(json => {
      dispatch({ type: GET_MESSAGE, payload: json[0] });
    });
};

export const getConversation = idUser => dispatch => {
  fetch(
    `https://api.mlab.com/api/1/databases/conversations/collections/conversation?q={"users": "${idUser}"}&apiKey=Vo12xqTxw-1M8hd2vp3w5B_Xj3FTuHGS`,
  )
    .then(response => response.json())
    .then(json => {
      dispatch({ type: GET_CONVERSATION, payload: json });
    });
};

export const updateMessage = (message, idConversation) => dispatch => {
  const url = `https://api.mlab.com/api/1/databases/conversations/collections/conversation?q={"chat_identifier": "${idConversation}"}&apiKey=Vo12xqTxw-1M8hd2vp3w5B_Xj3FTuHGS`;
  const request = {
    method: 'PUT',
    body: JSON.stringify({
      $push: {
        messages: message,
      },
    }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  };
  fetch(url, request)
    .then(response => response.json())
    .then(json => {
      dispatch({ type: SET_MESSAGE, payload: message });
    });
};
