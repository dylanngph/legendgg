import { combineReducers } from "redux";
import * as constants from "./layout.constant";

const initialState = {
  stateNavUserMenu: localStorage.getItem('token') !== null,
};

function layoutStore(state = initialState, action) {
  switch (action.type) {
    case constants.CHANGE_STATE_NAV_USER_MENU:
      return {
        ...state,
        stateNavUserMenu: !state.stateNavUserMenu,
      };
    default:
      return state;
  }
}

export default combineReducers({ layoutStore });