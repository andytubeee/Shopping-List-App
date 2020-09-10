import { v1 as uuid } from 'uuid';
import {
  GET_ITEMS,
  ADD_ITEM,
  DEL_ITEM,
  EDIT_DEL_ITEM,
  ITEMS_LOADING,
} from '../actions/types';
import update from 'react-addons-update';
import axios from 'axios';

const initialState = {
  items: [],
  isEmpty: false,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      console.log(action.payload.length);
      return {
        ...state,
        items: action.payload,
        loading: false,
        isEmpty: action.payload.length != 0,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
        isEmpty: false,
      };
    case DEL_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      };
    case EDIT_DEL_ITEM: // Useless
      console.log(action.payload);
      return {
        ...state,
        items: state.items.filter(
          item => item.id !== action.payload.item.id.id
        ),
      }; // Useless
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
