import { GET_ITEMS, ADD_ITEM, DEL_ITEM, EDIT_DEL_ITEM } from './types';

export const getItems = () => {
  return {
    type: GET_ITEMS,
  };
};

export const addItem = item => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};

export const editItem = (item, id) => {
  return {
    type: EDIT_DEL_ITEM,
    payload: { item: item, id: id },
  };
};

export const delItem = id => {
  return {
    type: DEL_ITEM,
    payload: id,
  };
};
