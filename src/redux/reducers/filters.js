import { CHECKBOX_CLICK } from '../actions/actionTypes';

const initialState = {
  // общий чекбокс должен быть первым!
  data: [
    { id: 1, name: 'Все', checked: false },
    { id: 2, name: 'Без пересадок', checked: false },
    { id: 3, name: '1 пересадка', checked: false },
    { id: 4, name: '2 пересадки', checked: true },
    { id: 5, name: '3 пересадки', checked: true },
  ],
}
const validateCheckBox = (data, id) => {
  const currentChecked = (currentId) => {
    const [currentCheckBox] = (data.filter((item) => item.id === currentId))
    return currentCheckBox.checked;
  }
  const restCheckboxChecked = (currentData) => currentData.filter((item) => item.id !== 1).map((item) => item.checked);

  const generalCheck = (bool) => data.map((item) => {
    item.checked = bool;
    return item
  })

  const someCheck = (bool, currId) => {
    if (bool === true) {
      return data.map((item) => {
        if (item.id === 1 || item.id === currId) {
          item.checked = false;
        }
        return item;
      })
    }
    const tempData = data.map((item) => {
      if (item.id === currId) {
        item.checked = true;
      }
      return item;
    })
    if (restCheckboxChecked(tempData).every((item) => item === true)) {
      tempData[0].checked = true;
    }
    return tempData;
  }

  if (id === 1) {
    if (currentChecked(id)) {
      return generalCheck(false);
    }
    return generalCheck(true);
  }
  if (currentChecked(id)) {
    return someCheck(true, id);
  } return someCheck(false, id);
}

export default function filters(state = initialState, action) {
  switch (action.type) {
    case CHECKBOX_CLICK: {
      return {
        data: validateCheckBox(state.data, action.payload),
      }
    }
    default:
      return state
  }
}