import { CHECKBOX_CLICK } from './actionTypes';

export function checkboxClick(id) {
  return {
    type: CHECKBOX_CLICK,
    payload: id,
  }
}