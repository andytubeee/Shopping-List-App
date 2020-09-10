import {
  GET_ITEMS,
  ADD_ITEM,
  DEL_ITEM,
  EDIT_DEL_ITEM,
  ITEMS_LOADING,
} from './types';
import axios from 'axios';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch(err => alert(err));
};

export const addItem = item => dispatch => {
  // dispatch(setItemsLoading());
  axios
    .post('/api/items', item)
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch(err => alert(err));
};

export const editItem = (item, id) => {
  return {
    type: EDIT_DEL_ITEM,
    payload: { item: item, id: id },
  };
};

export const delItem = id => dispatch => {
  axios.delete(`api/items/${id}`).then(res =>
    dispatch({
      type: DEL_ITEM,
      payload: id,
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
