import axios from 'axios';
import {
  VALIDATE_CHECKBOX,
  LOAD_ERROR,
  SEARCH_ID_LOADED,
  TICKETS_LOADED,
  CHANGE_ACTIVE_BUTTON,
  PAGINATE,
  START_BUTTON_CLICK,
  END_BUTTON_CLICK,
} from './actionTypes';

export function validateCheckBox(data, id) {
  const currentChecked = (currentId) => {
    const [currentCheckBox] = (data.filter((item) => item.id === currentId))
    return currentCheckBox.checked;
  }
  const getCheckboxesState = (currentData) => currentData.filter((item) => item.id !== 1).map((item) => item.checked);

  const clickGeneralCheckbox = (bool) => data.map((item) => {
    item.checked = bool;
    return item
  })

  const clickSomeCheckbox = (bool, currId) => {
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
    if (getCheckboxesState(tempData).every((item) => item === true)) {
      tempData[0].checked = true;
    }
    return tempData;
  }
  let newData = [];
  if (id === 1) {
    newData = clickGeneralCheckbox(!currentChecked(id));
  } else {
    newData = clickSomeCheckbox(currentChecked(id), id);
  }
  const newActiveFilters = newData.filter((item, i) => item.checked && i !== 0).map((item) => item.stops);

  return {
    type: VALIDATE_CHECKBOX,
    data: newData,
    activeFilters: newActiveFilters,
  }
}

export function checkboxClick(id) {
  return (dispatch, getState) => {
    const { filtersData } = getState().aviasales;
    dispatch(validateCheckBox(filtersData, id))
  }
}

export function loadError(error) {
  return {
    type: LOAD_ERROR,
    error,
  }
}
export function searchIdLoaded(searchId) {
  return {
    type: SEARCH_ID_LOADED,
    searchId,
  }
}
export function getSearchId() {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://front-test.beta.aviasales.ru/search');
      // const response = await axios.get('https://aviasales-test-api.java-mentor.com/search');
      const { searchId } = response.data;
      dispatch(searchIdLoaded(searchId))
    } catch (e) {
      dispatch(loadError(e))
    }
  }
}
export function ticketsLoaded(ticketsData, stop) {
  return {
    type: TICKETS_LOADED,
    ticketsData,
    stop,
  }
}

export function getPackTickets() {
  return async (dispatch, getState) => {
    try {
      const responce = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${getState().aviasales.searchId}`)
      // const responce = await axios.get(`https://aviasales-test-api.java-mentor.com/tickets?searchId=${getState().aviasales.searchId}`)
      const nextPackTickets = responce.data.tickets;
      const result = getState().aviasales.ticketsData.concat(nextPackTickets);
      const loadStop = responce.data.stop;
      dispatch(ticketsLoaded(result, loadStop))
    } catch (e) {
      dispatch(loadError(e))
    }
  }
}

export function loadingTicketsList() {
  return (dispatch, getState) => {
    const timeout = window.setInterval(() => {
      if (!getState().aviasales.loading) {
        window.clearTimeout(timeout);
      } else {
        dispatch(getPackTickets())
      }
    }, 500)
  }
}

export function changeActiveButton(buttons, sort) {
  return {
    type: CHANGE_ACTIVE_BUTTON,
    buttons,
    sort,
  }
}

export function buttonClick(name) {
  return (dispatch, getState) => {
    const { buttons } = getState().aviasales;
    const newButtons = buttons.map((item) => {
      if (item.name === name) {
        item.active = true
      } else {
        item.active = false
      }
      return item
    })
    const sort = name;
    dispatch(changeActiveButton(newButtons, sort));
  }
}

export function paginate(page) {
  return {
    type: PAGINATE,
    page,
  }
}

export function startButtonClick() {
  return {
    type: START_BUTTON_CLICK,
  }
}

export function endButtonClick(lastPage) {
  return {
    type: END_BUTTON_CLICK,
    lastPage,
  }
}