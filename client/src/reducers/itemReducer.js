import { v1 as uuid } from 'uuid';
import { GET_ITEMS, ADD_ITEM, DEL_ITEM, EDIT_DEL_ITEM } from '../actions/types';
import update from 'react-addons-update';

const initialState = {
  items: [
    { id: uuid(), name: 'Eggs' },
    { id: uuid(), name: 'Milk' },
    { id: uuid(), name: 'Apples' },
    { id: uuid(), name: 'Chips' },
    { id: uuid(), name: 'Water' },
  ],
  isEmpty: false,
};

function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item;
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.item,
    };
  });
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        isEmpty: state.items.length == 0,
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
        items: state.items.filter(item => item.id !== action.payload),
        isEmpty: state.items.length - 1 == 0,
      };
    case EDIT_DEL_ITEM:
      console.log(action.payload);
      return {
        ...state,
        items: state.items.filter(
          item => item.id !== action.payload.item.id.id
        ),
      };
    default:
      return state;
  }
}
