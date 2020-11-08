import {
  VALIDATE_CHECKBOX, SEARCH_ID_LOADED, TICKETS_LOADED,
  CHANGE_ACTIVE_BUTTON, PAGINATE, START_BUTTON_CLICK,
  END_BUTTON_CLICK,
} from '../actions/actionTypes'

const initialState = {
  // общий чекбокс должен быть первым!
  filtersData: [
    { id: 1, name: 'Все', checked: false },
    {
      id: 2, name: 'Без пересадок', stops: 0, checked: false,
    },
    {
      id: 3, name: '1 пересадка', stops: 1, checked: false,
    },
    {
      id: 4, name: '2 пересадки', stops: 2, checked: false,
    },
    {
      id: 5, name: '3 пересадки', stops: 3, checked: false,
    },
  ],
  activeFilters: [],
  ticketsData: [],
  buttons: [
    { name: 'cheap', value: 'самый дешевый', active: true },
    { name: 'fast', value: 'самый быстрый', active: false },
  ],
  sort: 'cheap',
  searchId: '',
  loading: false,
  error: null,
  stor: false,
  currentPage: 1,
  ticketsPerPage: 5,
}

export default function aviasales(state = initialState, action) {
  switch (action.type) {
    case VALIDATE_CHECKBOX:
      return {
        ...state, filtersData: action.data, activeFilters: action.activeFilters, currentPage: 1,
      }
    case SEARCH_ID_LOADED:
      return {
        ...state, searchId: action.searchId, loading: true,
      }
    case TICKETS_LOADED:
      return {
        ...state,
        ticketsData: action.ticketsData,
        loading: !action.stop,
      }
    case CHANGE_ACTIVE_BUTTON:
      return {
        ...state, buttons: action.buttons, sort: action.sort, currentPage: 1,
      }
    case PAGINATE:
      return {
        ...state, currentPage: action.page,
      }
    case START_BUTTON_CLICK:
      return {
        ...state, currentPage: 1,
      }
    case END_BUTTON_CLICK:
      return {
        ...state, currentPage: action.lastPage,
      }
    default:
      return state
  }
}